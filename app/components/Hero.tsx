import { ArrowRightIcon, TriangleAlert } from "lucide-react";
import { ButtonWithLink } from "./ButtonWithLink";
import { Rich } from "./Rich";
import { Meter, Recommendation } from "./Meter";
import { usePreferences } from "~/contexts/PreferencesContext";

const APP_URL = "https://app.internkit.ee";

function CandidateCard({ name, initials, meta, skills, score, isNew, risk }: {
  name: string; initials: string; meta: string; skills: string[]; score: number; isNew?: boolean; risk?: string;
}) {
  const { t } = usePreferences();

  return (
    <article className="bg-surface rounded-md stamp p-5 md:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="size-10 shrink-0 rounded-full bg-action-tint text-accent text-body font-semibold inline-flex items-center justify-center">
          {initials}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-h3 font-semibold">{name}</h3>
          <p className="text-small text-fg-3">{meta}</p>
        </div>
        {isNew && <span className="label rounded-xs bg-highlight text-on-highlight px-1.5 py-0.5">{t("mock.new")}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="rounded-pill border border-action-line bg-action-tint text-accent px-2.5 py-0.5 text-small">
            {s}
          </span>
        ))}
        {risk && (
          <span className="inline-flex items-center gap-1 rounded-pill border border-warning-line bg-warning-tint text-warning-fg px-2.5 py-0.5 text-small">
            <TriangleAlert className="size-4" strokeWidth={1.75} aria-hidden />
            {risk}
          </span>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="label text-fg-3">{t("mock.scoreLabel")}</span>
          <Recommendation score={score} />
        </div>
        <Meter score={score} />
      </div>
    </article>
  );
}

export function Hero() {
  const { t } = usePreferences();

  return (
    <section className="wrap py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
      <div>
        <h1 className="text-display md:text-display-xl font-semibold mb-6">
          <Rich text={t("hero.title")} />
        </h1>
        <p className="text-body-l text-fg-2 max-w-xl mb-10">
          <Rich text={t("hero.description")} />
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <ButtonWithLink link={APP_URL} text={t("hero.joinButton")} size="lg" />
          <ButtonWithLink
            link="/pricing"
            text={t("hero.plansButton")}
            variant="secondary"
            size="lg"
            icon={<ArrowRightIcon className="size-5" strokeWidth={1.75} aria-hidden />}
          />
        </div>
      </div>

      {/* Product preview on the brand panel. Sample candidates, not real people. */}
      <div className="on-fill bg-hero rounded-lg p-5 sm:p-8 flex flex-col gap-6" aria-label={t("mock.previewLabel")} role="img">
        <p className="label text-on-action">{t("mock.listing")}</p>
        <CandidateCard
          name="Mari Tamm"
          initials="MT"
          meta={t("mock.c1.meta")}
          skills={["React", "TypeScript", "Node.js"]}
          score={86}
          isNew
        />
        <CandidateCard
          name="Karl Saar"
          initials="KS"
          meta={t("mock.c2.meta")}
          skills={["Vue", "JavaScript"]}
          score={58}
          risk={t("risk.shortTenure")}
        />
      </div>
    </section>
  );
}
