import { Link } from "react-router";
import { usePreferences } from "~/contexts/PreferencesContext";
import { ArrowRight } from "lucide-react";
import { ButtonWithLink } from "./ButtonWithLink";

const linkClass = "text-body text-fg-2 hover:text-link transition-colors";

export function Footer() {
  const { t } = usePreferences();

  const columns = [
    { title: "footer.product", links: [["footer.features", "/#how-it-works"], ["footer.pricing", "/pricing"]] },
    { title: "footer.resources", links: [["footer.blog", "#"], ["footer.support", "#"]] },
    { title: "footer.legal", links: [["footer.privacy", "#"], ["footer.terms", "#"]] },
  ];

  return (
    <footer className="mt-12 md:mt-16">
      {/* CTA band: Level 2 lime fill */}
      <div className="bg-tile-lime border-y-2 border-ink">
        <div className="wrap py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <h2 className="text-display md:text-display-xl font-semibold whitespace-pre-line mb-8">
              {t("footer.cta.title")}
            </h2>
            <ButtonWithLink
              link="https://app.internkit.ee"
              text={t("footer.cta.button")}
              size="lg"
              icon={<ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />}
            />
          </div>
          <img
            src="/logo.svg"
            alt=""
            className="hidden lg:block size-64 rounded-lg stamp"
          />
        </div>
      </div>

      <div className="wrap py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label text-fg-3 mb-4">{t(col.title)}</h3>
              <ul className="space-y-3">
                {col.links.map(([key, to]) => (
                  <li key={key}>
                    <Link to={to} className={linkClass}>{t(key)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="label text-fg-3 mb-4">{t("footer.followUs")}</h3>
            <a href="#" className={`${linkClass} inline-flex items-center gap-2`}>
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <p className="text-small text-fg-3 pt-8 border-t border-hair">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
