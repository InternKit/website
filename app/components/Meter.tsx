import { CircleCheck, Check, CircleMinus, TriangleAlert } from "lucide-react";
import { usePreferences } from "~/contexts/PreferencesContext";

// The product's recommendation bands (email-handler scoring rules): 80 / 65 / 45.
const recommendations = [
  { min: 80, key: "rec.strongYes", Icon: CircleCheck, fg: "text-success-fg", tick: "bg-success-solid" },
  { min: 65, key: "rec.yes", Icon: Check, fg: "text-success-fg", tick: "bg-success-solid" },
  { min: 45, key: "rec.maybe", Icon: CircleMinus, fg: "text-warning-fg", tick: "bg-warning-solid" },
  { min: 0, key: "rec.no", Icon: TriangleAlert, fg: "text-danger-fg", tick: "bg-danger-solid" },
];

export const recommendation = (score: number) => recommendations.find((r) => score >= r.min)!;

export function Recommendation({ score }: { score: number }) {
  const { t } = usePreferences();
  const rec = recommendation(score);
  return (
    <span className={`inline-flex items-center gap-1.5 text-small font-medium ${rec.fg}`}>
      <rec.Icon className="size-4" strokeWidth={1.75} aria-hidden />
      {t(rec.key)}
    </span>
  );
}

// The sample candidate shown in both the hero and the scorecard section.
export const sampleCandidate = { name: "Mari Tamm", initials: "MT", score: 86 };

export function RiskPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-pill border border-warning-line bg-warning-tint text-warning-fg px-2.5 py-0.5 text-small">
      <TriangleAlert className="size-4" strokeWidth={1.75} aria-hidden />
      {label}
    </span>
  );
}

// Twenty ticks, coloured by band; the number always sits beside it.
export function Meter({ score }: { score: number }) {
  const rec = recommendation(score);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 grid grid-cols-20 gap-0.5" aria-hidden>
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className={`h-3 rounded-xs ${i < Math.round(score / 5) ? rec.tick : "bg-sunken"}`} />
        ))}
      </div>
      <span className={`text-score font-semibold tabular-nums w-8 text-right ${rec.fg}`}>{score}</span>
    </div>
  );
}
