import { useEffect, useRef, useState } from "react";
import { Settings, Check } from "lucide-react";
import { usePreferences } from "~/contexts/PreferencesContext";
import type { Language } from "~/translations";

// Language names are shown in their own language, so they are not translated.
const languages: [Language, string, string][] = [
  ["en", "English", "en"],
  ["ee", "Eesti", "et"],
];

export function SettingsMenu() {
  const { language, setLanguage, t } = usePreferences();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on any press outside the menu.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          close();
        }
      }}
    >
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="group size-11 inline-flex items-center justify-center rounded-sm text-fg-1 cursor-pointer"
        aria-label={t("settings.label")}
        title={t("settings.label")}
        aria-expanded={open}
        aria-controls="settings-menu"
      >
        <Settings
          // Filled on hover/open; the centre circle takes the surface colour so the hole stays visible.
          className={`size-5 transition-[rotate,fill] duration-200 ease-out [&_circle]:fill-surface group-hover:rotate-45 group-hover:fill-fg-1 ${
            open ? "rotate-45 fill-fg-1" : "fill-transparent"
          }`}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      {/* Floats over content, so it takes the large stamp */}
      {open && (
        <div id="settings-menu" className="absolute right-0 top-full mt-2 z-30 w-56 rounded-sm bg-surface stamp-lg p-2">
          <p id="settings-language" className="label text-fg-3 px-3 pt-2 pb-1">{t("settings.language")}</p>
          <div role="group" aria-labelledby="settings-language">
            {languages.map(([code, name, bcp47]) => (
              <button
                key={code}
                lang={bcp47}
                autoFocus={code === language}
                aria-pressed={code === language}
                onClick={() => {
                  setLanguage(code);
                  close();
                }}
                className="w-full h-11 flex items-center justify-between rounded-sm px-3 text-body text-fg-1 hover:bg-action-tint-weak cursor-pointer"
              >
                {name}
                {code === language && <Check className="size-5" strokeWidth={1.75} aria-hidden />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
