import { usePreferences } from "~/contexts/PreferencesContext";

export function TestimonialsSection() {
  const { t } = usePreferences();

  const testimonials = [
    {
      name: "Alissa R.",
    },
    {
      name: "Alissa L.",
    },
    {
      name: "Alissa X.",
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("testimonials.title")}
            </h2>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-gradient-from to-purple-gradient-to rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col"
              >
                {/* Avatar */}
                <div className="mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-white dark:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg md:text-xl text-white font-semibold mb-3 md:mb-4">
                  {testimonial.name}
                </h3>

                {/* Quote */}
                <p className="text-sm md:text-base text-white dark:text-gray-100 leading-relaxed">
                  {t("testimonials.quote")}
                </p>
              </div>
            ))}
          </div>

          {/* See more link */}
          <div className="text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              {t("testimonials.seeMore")}
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
