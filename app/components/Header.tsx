import { Link } from "react-router";
import { Logo } from "./TextLogo";
import { useState } from "react";
import { usePreferences } from "~/contexts/PreferencesContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = usePreferences();

  return (
    <header className="fixed md:w-1/2 w-11/12 left-1/2 top-5 rounded-2xl -translate-x-1/2 z-50 bg-white/90 dark:bg-brand-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 md:gap-8">
            <a
              href="https://app.internkit.ee"
              className="text-sm md:text-base font-semibold text-gray-900 dark:text-white transition-colors"
            >
              {t("nav.login")}
            </a>
            <Link
              to="/pricing"
              className="text-sm md:text-base font-semibold text-gray-900 dark:text-white transition-colors"
            >
              {t("nav.pricing")}
            </Link>
          </nav>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden text-gray-900 dark:text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("nav.toggleMenu")}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <nav
          className={`md:hidden overflow-hidden border-t border-gray-200 dark:border-white/10 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4 py-4">
            <Link
                to="/pricing"
                className="text-base text-gray-900 dark:text-white hover:text-purple-700 dark:hover:text-purple-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.pricing")}
            </Link>
            <a
              href="https://app.internkit.ee"
              className="text-base text-white hover:text-purple-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.login")}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
