import { usePreferences } from "~/contexts/PreferencesContext";
import intelImage from '~/assets/intel.png'

interface InsightsSectionProps {
  columns?: 1 | 2;
}

export function InsightsSection({ columns = 2 }: InsightsSectionProps) {
  const { t } = usePreferences();

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("insights.title")}
            </h2>
          </div>

          {/* Placeholder boxes */}
          {columns === 2 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-gray-placeholder rounded-3xl md:rounded-[3rem] h-64 md:h-80 lg:h-96 w-full overflow-hidden">
                <img src={intelImage} alt="inteligence" className="h-full object-cover object-left" />
              </div>
              <div className="bg-gray-placeholder rounded-3xl md:rounded-[3rem] h-64 md:h-80 lg:h-96 w-full"></div>
            </div>
          ) : (
            <div className="bg-gray-placeholder rounded-3xl md:rounded-[3rem] h-64 md:h-96 lg:h-[700px] w-full"></div>
          )}
        </div>
      </div>
    </section>
  );
}
