import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "../translations";
import type { Language } from "../translations";

interface PreferencesContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text: string = translations[language][key as keyof typeof translations.en] || key;

    // Replace parameters in the text (e.g., {year} with actual value)
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, String(value));
      });
    }

    return text;
  };

  return (
    <PreferencesContext.Provider
      value={{ language, setLanguage, t }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
