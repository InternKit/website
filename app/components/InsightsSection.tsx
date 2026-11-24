import { Check, Mail, Upload, Sparkles, Code } from "lucide-react";
import { usePreferences } from "~/contexts/PreferencesContext";
import { Meter, Recommendation, RiskPill, recommendation, sampleCandidate } from "./Meter";

// The five criteria and weights the product's scorecard uses. Sample scores.
const breakdown = [
  { key: "score.roleMatch", weight: 30, score: 92 },
  { key: "score.experience", weight: 20, score: 78 },
  { key: "score.companies", weight: 20, score: 70 },
  { key: "score.skills", weight: 15, score: 88 },
  { key: "score.languages", weight: 10, score: 85 },
];

const features = [
  { key: "features.forward", Icon: Mail },
  { key: "features.upload", Icon: Upload },
  { key: "features.listings", Icon: Sparkles },
  { key: "features.embed", Icon: Code },
];

export function InsightsSection() {
  const { t } = usePreferences();
  const { name, initials, score } = sampleCandidate;

  return (
    <section className="wrap py-12 md:py-16">
      <div className="max-w-2xl mb-12">
        <h2 className="text-display font-semibold mb-4">{t("insights.title")}</h2>
        <p className="text-body-l text-fg-2">{t("insights.description")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Sample scorecard */}
        <article className="rounded-md border border-hair bg-surface p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="size-14 shrink-0 rounded-full bg-action-tint text-accent text-h2 font-semibold inline-flex items-center justify-center">
              {initials}
            </span>
            <div className="flex-1">
              <p className="label text-fg-3">{t("insights.sample")}</p>
              <h3 className="text-h2 font-semibold">{name}</h3>
            </div>
            <div className="text-right">
              <p className={`text-stat font-semibold tabular-nums ${recommendation(score).fg}`}>{score}</p>
              <Recommendation score={score} />
            </div>
          </div>

          <p className="text-body text-fg-2 border-l-2 border-ink pl-4">{t("insights.summary")}</p>

          <div className="flex flex-col gap-4">
            {breakdown.map(({ key, weight, score: criterion }) => (
              <div key={key}>
                <p className="label text-fg-3 mb-1">
                  {t(key)} · {weight}%
                </p>
                <Meter score={criterion} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-hair">
            <div>
              <p className="label text-fg-3 mb-3">{t("insights.strengths")}</p>
              <ul className="space-y-2">
                {["insights.strength1", "insights.strength2", "insights.strength3"].map((k) => (
                  <li key={k} className="flex items-start gap-2 text-small text-fg-1">
                    <Check className="size-4 mt-0.5 shrink-0 text-success-fg" strokeWidth={1.75} aria-hidden />
                    {t(k)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-fg-3 mb-3">{t("insights.risks")}</p>
              <RiskPill label={t("risk.shortTenure")} />
            </div>
          </div>
        </article>

        {/* What's included */}
        <div className="flex flex-col gap-4">
          {features.map(({ key, Icon }) => (
            <div key={key} className="rounded-md border border-hair bg-surface p-6 flex gap-4">
              <Icon className="size-5 shrink-0 mt-0.5 text-fg-1" strokeWidth={1.75} aria-hidden />
              <div>
                <h3 className="text-h3 font-semibold mb-1">{t(`${key}.title`)}</h3>
                <p className="text-body text-fg-2">{t(`${key}.body`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
