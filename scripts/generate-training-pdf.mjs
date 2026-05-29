import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const requireFromScript = createRequire(import.meta.url);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const moduleCache = new Map();

function loadTsModule(filePath) {
  const resolvedPath = path.resolve(filePath);

  if (moduleCache.has(resolvedPath)) {
    return moduleCache.get(resolvedPath).exports;
  }

  const source = fs.readFileSync(resolvedPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: resolvedPath,
  }).outputText;

  const localModule = { exports: {} };
  moduleCache.set(resolvedPath, localModule);

  function localRequire(specifier) {
    if (specifier.startsWith(".")) {
      const candidate = path.resolve(path.dirname(resolvedPath), specifier);
      const tsPath = candidate.endsWith(".ts") ? candidate : `${candidate}.ts`;
      return loadTsModule(tsPath);
    }

    return requireFromScript(specifier);
  }

  vm.runInNewContext(transpiled, {
    exports: localModule.exports,
    module: localModule,
    require: localRequire,
    __dirname: path.dirname(resolvedPath),
    __filename: resolvedPath,
  });

  return localModule.exports;
}

const { ageGroupById, ageGroups } = loadTsModule(
  path.join(repoRoot, "src/data/basketball/age-groups.ts"),
);
const { drillById, drills } = loadTsModule(path.join(repoRoot, "src/data/basketball/drills.ts"));
const { presetPracticePlans } = loadTsModule(
  path.join(repoRoot, "src/data/basketball/practice-plans.ts"),
);

const outputDir = path.join(repoRoot, "public");
const outputPath = path.join(outputDir, "basketball-training-plans.pdf");

function escapePdfText(text) {
  return String(text)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "-");
}

function wrapText(text, fontSize, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  const approximateCharWidth = fontSize * 0.5;
  const maxChars = Math.max(22, Math.floor(maxWidth / approximateCharWidth));

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

class PdfDocument {
  constructor() {
    this.width = 595.28;
    this.height = 841.89;
    this.margin = 46;
    this.y = this.height - this.margin;
    this.pages = [];
    this.current = [];
  }

  ensureSpace(requiredHeight) {
    if (this.y - requiredHeight < this.margin) {
      this.addPage();
    }
  }

  addPage() {
    if (this.current.length > 0) {
      this.pages.push(this.current.join("\n"));
    }

    this.current = [];
    this.y = this.height - this.margin;
  }

  text(value, options = {}) {
    const fontSize = options.size ?? 10;
    const leading = options.leading ?? fontSize + 4;
    const font = options.bold ? "F2" : "F1";
    const indent = options.indent ?? 0;
    const maxWidth = this.width - this.margin * 2 - indent;
    const lines = wrapText(value, fontSize, maxWidth);

    this.ensureSpace(lines.length * leading + 2);

    for (const line of lines) {
      this.current.push(
        `BT /${font} ${fontSize} Tf ${this.margin + indent} ${this.y.toFixed(2)} Td (${escapePdfText(
          line,
        )}) Tj ET`,
      );
      this.y -= leading;
    }
  }

  gap(size = 8) {
    this.ensureSpace(size);
    this.y -= size;
  }

  rule() {
    this.ensureSpace(12);
    const y = this.y.toFixed(2);
    this.current.push(
      `${this.margin} ${y} m ${this.width - this.margin} ${y} l 0.6 w 0.82 0.82 0.82 RG S`,
    );
    this.y -= 12;
  }

  finish() {
    if (this.current.length > 0) {
      this.pages.push(this.current.join("\n"));
      this.current = [];
    }

    const objects = [];
    const pagesId = 1;
    const fontRegularId = 2;
    const fontBoldId = 3;
    objects[pagesId] = null;
    objects[fontRegularId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
    objects[fontBoldId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

    const pageIds = [];

    for (const pageContent of this.pages) {
      const contentId = objects.length;
      objects[contentId] = `<< /Length ${Buffer.byteLength(pageContent, "utf8")} >>\nstream\n${pageContent}\nendstream`;
      const pageId = objects.length;
      objects[pageId] =
        `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${this.width} ${this.height}] ` +
        `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> ` +
        `/Contents ${contentId} 0 R >>`;
      pageIds.push(pageId);
    }

    objects[pagesId] = `<< /Type /Pages /Kids [${pageIds
      .map((pageId) => `${pageId} 0 R`)
      .join(" ")}] /Count ${pageIds.length} >>`;

    const catalogId = objects.length;
    objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;

    let pdf = "%PDF-1.4\n";
    const offsets = [0];

    for (let id = 1; id < objects.length; id += 1) {
      offsets[id] = Buffer.byteLength(pdf, "utf8");
      pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(pdf, "utf8");
    pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;

    for (let id = 1; id < objects.length; id += 1) {
      pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
    return Buffer.from(pdf, "utf8");
  }
}

function drillTitle(drillId) {
  return drillById[drillId]?.title ?? drillId;
}

const pdf = new PdfDocument();
pdf.text("CourtCraft Basketball Training Plans", { size: 22, bold: true, leading: 28 });
pdf.text("Practice plans exported from the local app data, including U16.", {
  size: 12,
  leading: 17,
});
pdf.text("Independent elite player development resource. Not official NBA content.", {
  size: 10,
  leading: 15,
});
pdf.gap(8);
pdf.rule();

pdf.text("Age Groups", { size: 16, bold: true, leading: 22 });
for (const ageGroup of ageGroups) {
  pdf.text(`${ageGroup.label} - ${ageGroup.ages}`, { size: 12, bold: true, leading: 17 });
  pdf.text(`Recommended duration: ${ageGroup.recommendedDuration}`, { size: 10, leading: 14 });
  pdf.text(`Focus: ${ageGroup.focus.join(", ")}`, { size: 10, leading: 14, indent: 12 });
  if (ageGroup.intensiveNote) {
    pdf.text(`Load note: ${ageGroup.intensiveNote}`, { size: 10, leading: 14, indent: 12 });
  }
  pdf.gap(4);
}

pdf.addPage();
pdf.text("Preset Practice Plans", { size: 18, bold: true, leading: 24 });

for (const plan of presetPracticePlans) {
  const ageGroup = ageGroupById[plan.ageGroupId];
  pdf.gap(8);
  pdf.text(`${plan.title} (${ageGroup.label}, ${plan.durationMin} min)`, {
    size: 14,
    bold: true,
    leading: 19,
  });
  pdf.text(plan.introGoal, { size: 10, leading: 14 });
  if (plan.warning) {
    pdf.text(`Warning: ${plan.warning}`, { size: 10, leading: 14 });
  }
  pdf.text(`Load note: ${plan.loadNote}`, { size: 10, leading: 14 });
  pdf.text("Timeline:", { size: 10, bold: true, leading: 15 });

  for (const segment of plan.segments) {
    const drillsText =
      segment.drillIds.length > 0
        ? segment.drillIds.map((drillId) => drillTitle(drillId)).join("; ")
        : "Water, reset, teaching check, and role rotation.";

    pdf.text(`${segment.minutes} min - ${segment.title}: ${drillsText}`, {
      size: 9.5,
      leading: 13.5,
      indent: 12,
    });
    pdf.text(`Cue: ${segment.coachingEmphasis}`, { size: 9, leading: 13, indent: 24 });
  }
}

pdf.addPage();
pdf.text("Drill Library Index", { size: 18, bold: true, leading: 24 });
pdf.text(
  "Use this index to quickly match a plan segment to drill detail pages in the app. Court diagrams remain in the app.",
  { size: 10, leading: 15 },
);

for (const ageGroup of ageGroups) {
  const groupDrills = drills.filter((drill) => drill.ageGroups.includes(ageGroup.id));
  pdf.gap(10);
  pdf.text(`${ageGroup.label} drills (${groupDrills.length})`, { size: 14, bold: true, leading: 19 });

  for (const drill of groupDrills) {
    pdf.text(
      `${drill.title} - ${drill.durationMin} min, ${drill.intensity}, ${drill.category.replaceAll(
        "_",
        " ",
      )}. ${drill.objective}`,
      { size: 9.5, leading: 13.5, indent: 12 },
    );
  }
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, pdf.finish());

console.log(`Wrote ${outputPath}`);
