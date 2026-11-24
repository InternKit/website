import { Check } from "lucide-react";
import type { Route } from "./+types/pricing";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { usePreferences } from "~/contexts/PreferencesContext";
import { ButtonWithLink } from "../components/ButtonWithLink";
import { Rich } from "../components/Rich";
import { APP_URL } from "~/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pricing – InternKit" },
    { name: "description", content: "Monthly plans by CV analysis volume, from €29. Every account starts on Free." },
  ];
}


// Mirrors the self-serve plans in the product (backend/src/domain/billing.ts).
// Growth is the recommended plan, so it alone takes the Stamp and the Highlighter.
const plans = [
  { key: "starter", cvs: 30, price: 29 },
  { key: "growth", cvs: 100, price: 79, recommended: true, sync: true },
  { key: "expansion", cvs: 300, price: 199, sync: true },
];

export default function Pricing() {
  const { t } = usePreferences();

  return (
    <>
      <Header />
      <main className="wrap py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-display md:text-display-xl font-semibold mb-4">
            <Rich text={t("pricing.title")} />
          </h1>
          <p className="text-body-l text-fg-2 max-w-xl mx-auto">{t("pricing.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map(({ key, cvs, price, recommended, sync }) => (
            <section
              key={key}
              className={`rounded-md bg-surface p-6 md:p-8 flex flex-col gap-8 ${recommended ? "stamp" : "border border-hair"}`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h2 className="text-h1 font-semibold">{t(`pricing.${key}`)}</h2>
                  {recommended && (
                    <span className="label rounded-pill bg-action-tint text-accent border border-action-line px-2.5 py-0.5">
                      {t("pricing.recommended")}
                    </span>
                  )}
                </div>
                <p className="flex items-baseline gap-1 flex-wrap">
                  <span className={`text-display font-semibold tabular-nums ${recommended ? "highlight" : ""}`}>
                    {t("pricing.price", { price })}
                  </span>
                  <span className="text-body text-fg-3">{t("pricing.perMonthVat")}</span>
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-body font-semibold text-fg-1">
                  <Check className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
                  {t("pricing.cvsPerMonth", { count: cvs })}
                </li>
                {[...(sync ? ["pricing.feature.sync"] : []), "pricing.feature.scorecards", "pricing.feature.intake", "pricing.feature.ranking"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-body text-fg-1">
                    <Check className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
                    {t(f)}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col">
                <ButtonWithLink
                  link={APP_URL}
                  text={t("pricing.choose", { plan: t(`pricing.${key}`) })}
                  variant={recommended ? "primary" : "secondary"}
                />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto flex flex-col gap-2 text-center text-small text-fg-3">
          <p>{t("pricing.free")}</p>
          <p>{t("pricing.held")}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
