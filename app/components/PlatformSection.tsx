import { usePreferences } from "~/contexts/PreferencesContext";

export function PlatformSection() {
  const { t } = usePreferences();

  return (
    <section id="platform" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title and subtitle */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              {t("platform.title")}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("platform.description")}
            </p>
          </div>

          {/* Placeholder image box */}
          <div className="bg-gray-placeholder rounded-3xl md:rounded-[3rem] h-64 md:h-96 lg:h-[700px] w-full"></div>
        </div>
      </div>
    </section>
  );
}
