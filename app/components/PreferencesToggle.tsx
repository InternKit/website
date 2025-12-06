import { usePreferences } from "~/contexts/PreferencesContext";
import { Sun, Moon } from "lucide-react";

export function PreferencesToggle() {
  const { theme, language, toggleTheme, toggleLanguage, t } = usePreferences();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 bg-white/90 dark:bg-brand-dark/80 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-full p-2">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full backdrop-blur-sm flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all hover:scale-105 cursor-pointer"
        aria-label={t("preferences.theme")}
        title={t("preferences.theme")}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 md:w-6 md:h-6 text-purple-light" />
        ) : (
          <Moon className="w-5 h-5 md:w-6 md:h-6 text-purple-primary" />
        )}
      </button>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full backdrop-blur-sm flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 hover:border-gray-400 dark:hover:border-white/30 transition-all hover:scale-105 cursor-pointer"
        aria-label={t("preferences.language")}
        title={t("preferences.language")}
      >
        {theme === "dark" ? (
          <span className="text-sm md:text-base font-bold text-purple-light">
            {language.toUpperCase()}
          </span>
        ) : (
          <span className="text-sm md:text-base font-bold text-purple-primary">
            {language.toUpperCase()}
          </span>
        )}
      </button>
    </div>
  );
}
