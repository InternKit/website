import { RefreshCw, Check } from "lucide-react";
import { usePreferences } from "~/contexts/PreferencesContext";

// Sample synced positions; the source is described generically on purpose.
const positions = [
  { title: "sync.p1", source: "sync.sourceCareers", applications: 14, isNew: false },
  { title: "sync.p2", source: "sync.sourceBoard", applications: 9, isNew: false },
  { title: "sync.p3", source: "sync.sourceBoard", applications: 0, isNew: true },
];

export function SyncSection() {
  const { t } = usePreferences();

  return (
    <section className="wrap py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-display font-semibold mb-4">{t("sync.title")}</h2>
        <p className="text-body-l text-fg-2 mb-8">{t("sync.description")}</p>
        <ul className="space-y-3">
          {["sync.point1", "sync.point2", "sync.point3"].map((k) => (
            <li key={k} className="flex items-start gap-3 text-body-l text-fg-1">
              <Check className="size-5 mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden />
              {t(k)}
            </li>
          ))}
        </ul>
        <p className="text-small text-fg-3 mt-6">{t("sync.plans")}</p>
      </div>

      {/* Sample positions list */}
      <div className="rounded-md bg-surface stamp overflow-hidden" role="img" aria-label={t("sync.previewLabel")}>
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-hair">
          <span className="label text-fg-3">{t("sync.listTitle")}</span>
          <span className="label text-fg-3 inline-flex items-center gap-2">
            <RefreshCw className="size-4" strokeWidth={1.75} aria-hidden />
            {t("sync.lastSync")}
          </span>
        </div>
        <ul>
          {positions.map(({ title, source, applications, isNew }) => (
            <li key={title} className="flex items-center gap-4 px-6 py-4 border-b border-hair last:border-b-0">
              <div className="flex-1 min-w-0">
                <p className="text-h3 font-semibold flex items-center gap-2">
                  {t(title)}
                  {isNew && <span className="label rounded-xs bg-highlight text-on-highlight px-1.5 py-0.5">{t("mock.new")}</span>}
                </p>
                <span className="inline-flex mt-1 rounded-pill border border-hair px-2.5 py-0.5 text-small text-fg-2">
                  {t(source)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-score font-semibold tabular-nums">{applications}</p>
                <p className="label text-fg-3">{t("sync.applications")}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
