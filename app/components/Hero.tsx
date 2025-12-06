import { Link } from "react-router";
import { ButtonWithLink } from "./ButtonWithLink";
import { ArrowRightIcon } from "lucide-react";
import { usePreferences } from "~/contexts/PreferencesContext";

export function Hero() {
  const { t } = usePreferences();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="/logo.svg"
            alt="Internkit"
            className="w-16 h-16 mx-auto mb-6 rounded-lg"
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 leading-tight whitespace-pre-line">
            {t("hero.title")}
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <ButtonWithLink link="https://app.internkit.ee" text={t("hero.joinButton")} />
            <ButtonWithLink
              link="/pricing"
              text={t("hero.plansButton")}
              variant="secondary"
              icon={<ArrowRightIcon className="w-6 h-6" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
