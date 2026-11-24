import { Link } from "react-router";
import { Logo } from "./TextLogo";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePreferences } from "~/contexts/PreferencesContext";
import { ButtonWithLink } from "./ButtonWithLink";
import { SettingsMenu } from "./SettingsMenu";
import { APP_URL } from "~/constants";


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = usePreferences();
  const close = () => setIsMenuOpen(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);

  // Close the mobile sheet on any press outside it (including the settings gear).
  useEffect(() => {
    if (!isMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!sheetRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isMenuOpen]);

  // Transparent at the top of the page; gains its surface and border once content scrolls under it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 border-b transition-colors duration-200 ${
        scrolled ? "bg-surface border-hair" : "bg-transparent border-transparent"
      }`}
      onKeyDown={(e) => {
        // Escape unmounts the sheet, so hand focus back to the button that opened it.
        if (e.key === "Escape" && isMenuOpen) {
          close();
          menuButtonRef.current?.focus();
        }
      }}
    >
      <div className="wrap relative flex items-center justify-between h-16">
        <Link to="/" aria-label="InternKit">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <ButtonWithLink link="/pricing" text={t("nav.pricing")} variant="ghost" />
            <ButtonWithLink link={APP_URL} text={t("nav.login")} variant="ghost" />
            {/* No lift on hover: the arrow slides in and the button grows left, pushing the nav links with it. */}
            <span className="ml-2">
              <ButtonWithLink
                link={APP_URL}
                text={t("hero.joinButton")}
                variant="reveal"
                icon={
                  <ArrowRight
                    className="h-5 w-0 opacity-0 group-hover:w-5 group-hover:ml-2 group-hover:opacity-100 group-focus-visible:w-5 group-focus-visible:ml-2 group-focus-visible:opacity-100 transition-all duration-200 ease-out"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                }
              />
            </span>
          </nav>

          <SettingsMenu />

          <button
            ref={menuButtonRef}
            className="md:hidden size-11 inline-flex items-center justify-center rounded-sm text-fg-1 hover:bg-action-tint-weak cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
          </button>
        </div>

        {/* Mobile sheet: floats over content, so it takes the large stamp */}
        {isMenuOpen && (
          <nav
            ref={sheetRef}
            id="mobile-menu"
            className="md:hidden absolute top-full inset-x-4 mt-2 p-2 flex flex-col gap-1 rounded-md bg-surface stamp-lg"
          >
            <ButtonWithLink link="/pricing" text={t("nav.pricing")} variant="ghost" onClick={close} />
            <ButtonWithLink link={APP_URL} text={t("nav.login")} variant="ghost" onClick={close} />
            <div className="p-2 pb-3 pr-3 flex flex-col">
              <ButtonWithLink link={APP_URL} text={t("hero.joinButton")} onClick={close} />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
