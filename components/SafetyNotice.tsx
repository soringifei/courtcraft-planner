import { AlertTriangle } from "lucide-react";

type SafetyNoticeProps = {
  children: React.ReactNode;
};

export function SafetyNotice({ children }: SafetyNoticeProps) {
  return (
    <div className="rounded-lg border border-amber-300/30 bg-amber-400/10 p-4 text-sm text-amber-50">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
        <div>{children}</div>
      </div>
    </div>
  );
}
