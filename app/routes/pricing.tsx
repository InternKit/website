import { useState, useRef, useEffect } from "react";
import type { Route } from "./+types/pricing";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { usePreferences } from "~/contexts/PreferencesContext";
import { ButtonWithLink } from "../components/ButtonWithLink";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pricing - Internkit" },
    { name: "description", content: "Choose the plan that's right for you" },
  ];
}

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const { t } = usePreferences();

  const monthlyRef = useRef<HTMLButtonElement>(null);
  const annualRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 16 });

  useEffect(() => {
    const updateSlider = () => {
      const button = billingPeriod === "monthly" ? monthlyRef.current : annualRef.current;
      if (button) {
        setSliderStyle({
          width: button.offsetWidth,
          left: button.offsetLeft,
        });
      }
    };

    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [billingPeriod]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                {t("pricing.title")}
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                {t("pricing.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl mx-auto">
              {/* Free Plan */}
              <div className="flex flex-col justify-between rounded-2xl p-6 md:p-8 transition-all bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{t("pricing.free.name")}</h3>
                  <div className="flex items-baseline mb-1">
                    <span className="text-4xl md:text-5xl font-bold">
                      {t("pricing.free.price")}
                    </span>
                    <span className="text-gray-700 dark:text-gray-400 ml-2">{t("pricing.free.period")}</span>
                  </div>

                  <ul className="space-y-3 mb-8 mt-4">
                    <li className="flex items-start gap-2.5">
                      <svg
                        className="w-5 h-5 text-dark dark:text-white mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{t("pricing.free.feature1")}</span>
                    </li>
                  </ul>
                </div>

                <ButtonWithLink
                  link="https://app.internkit.ee"
                  text={t("pricing.free.button")}
                  variant="secondary"
                />
              </div>

              {/* Intern Pack */}
              <div className="rounded-2xl p-6 md:p-8 transition-all bg-purple-primary border-2 border-purple-secondary text-brand-light dark:text-white">
                <div className="mb-6 flex justify-center">
                  {/* Billing Toggle */}
                  <div className="relative inline-flex items-center gap-2 bg-black/10 dark:bg-white/10 rounded-full p-1 border border-purple dark:border-white/20">
                    {/* Sliding background indicator */}
                    <div
                      className="absolute top-1 bottom-1 rounded-full bg-brand-dark dark:bg-white transition-all duration-300 ease-in-out"
                      style={{
                        width: `${sliderStyle.width}px`,
                        transform: `translateX(${sliderStyle.left - 4}px)`,
                      }}
                    />

                    <button
                      ref={monthlyRef}
                      onClick={() => setBillingPeriod("monthly")}
                      className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                        billingPeriod === "monthly"
                          ? "text-white dark:text-brand-dark"
                          : "text-brand-light dark:text-gray-300 dark:hover:text-white"
                      }`}
                    >
                      {t("pricing.monthly")}
                    </button>
                    <button
                      ref={annualRef}
                      onClick={() => setBillingPeriod("annual")}
                      className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                        billingPeriod === "annual"
                          ? "text-white dark:text-brand-dark"
                          : "text-brand-light dark:text-gray-300 dark:hover:text-white"
                      }`}
                    >
                      {t("pricing.annual")}
                      <span className="text-xs bg-brand-dark text-brand-light dark:text-white px-2 py-1 rounded-full">
                        {t("pricing.save")}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{t("pricing.internPack.name")}</h3>
                  <div className="flex items-baseline mb-1">
                    <span className="text-4xl md:text-5xl font-bold">
                      {billingPeriod === "monthly" ? t("pricing.internPack.monthlyPrice") : t("pricing.internPack.annualPrice")}
                    </span>
                    <span className="text-brand-light ml-2">
                      {billingPeriod === "monthly" ? t("pricing.internPack.monthlyPeriod") : t("pricing.internPack.annualPeriod")}
                    </span>
                  </div>
                  {billingPeriod === "annual" && (
                    <p className="text-sm text-brand-light mt-2">
                      {t("pricing.internPack.billedAnnually")}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2.5">
                    <svg
                      className="w-5 h-5 text-brand-light dark:text-white mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{t("pricing.internPack.feature1")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg
                      className="w-5 h-5 text-brand-light dark:text-white mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{t("pricing.internPack.feature2")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg
                      className="w-5 h-5 text-brand-light dark:text-white mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{t("pricing.internPack.feature3")}</span>
                  </li>
                </ul>

                <ButtonWithLink
                  link="https://app.internkit.ee"
                  text={t("pricing.internPack.button")}
                  variant="on-purple"
                />
              </div>
            </div>

            {/* FAQ or Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {t("pricing.trial")}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
