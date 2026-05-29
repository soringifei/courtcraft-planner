import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "CourtCraft Planner",
  description:
    "Age-specific basketball practice planning with pro-level drill structure and data-driven court diagrams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-zinc-400">
          Independent elite player development planner. Not official NBA content or league-affiliated
          material.
        </footer>
      </body>
    </html>
  );
}
