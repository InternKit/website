import { Link } from "react-router";
import { usePreferences } from "~/contexts/PreferencesContext";
import { ArrowRight } from "lucide-react";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { LoadingFallback, SpinningLogoFallback } from "./SpinningLogoFallback";

const SpinningLogo3D = lazy(() => import("./SpinningLogo3D"));

export function Footer() {
  const { t } = usePreferences();

  return (
    <footer className="bg-gray-50 dark:bg-brand-darker border-t border-gray-200 dark:border-white/10">
      {/* CTA Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left side - CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 whitespace-pre-line">
                {t("footer.cta.title")}
              </h2>
              <Link
                to="https://app.internkit.ee"
                target="_blank"
                className="inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-purple-primary text-white font-semibold rounded-full hover:bg-purple-secondary dark:hover:bg-purple-secondary transition-colors text-sm md:text-base"
              >
                {t("footer.cta.button")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right side - 3D Interactive Logo */}
            <div className="flex justify-center lg:justify-end">
              <ErrorBoundary fallback={<SpinningLogoFallback />}>
                <Suspense fallback={<LoadingFallback />}>
                  <SpinningLogo3D />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
              {/* Product */}
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-4">{t("footer.product")}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="#" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("footer.features")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("footer.pricing")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-4">{t("footer.resources")}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="#" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("footer.blog")}
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("footer.support")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-4">{t("footer.legal")}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="#" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("footer.privacy")}
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("footer.terms")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-4">{t("footer.followUs")}</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-500 pt-8 border-t border-gray-200 dark:border-white/10">
              <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
