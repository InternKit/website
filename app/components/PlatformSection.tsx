import { RefreshCw, ClipboardCheck, ListChecks } from "lucide-react";
import { usePreferences } from "~/contexts/PreferencesContext";

const steps = [
  { n: "01", Icon: RefreshCw, key: "platform.step1" },
  { n: "02", Icon: ClipboardCheck, key: "platform.step2" },
  { n: "03", Icon: ListChecks, key: "platform.step3" },
];

export function PlatformSection() {
  const { t } = usePreferences();

  return (
    <section id="how-it-works" className="wrap py-12 md:py-16">
      <div className="max-w-2xl mb-12">
        <h2 className="text-display font-semibold mb-4">{t("platform.title")}</h2>
        <p className="text-body-l text-fg-2">{t("platform.description")}</p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map(({ n, Icon, key }) => (
          <li key={n} className="bg-tile-lime rounded-md stamp p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="label text-fg-2">{t("platform.stepLabel")} {n}</span>
              <Icon className="size-5 text-fg-1" strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="text-h1 font-semibold">{t(`${key}.title`)}</h3>
            <p className="text-body text-fg-2">{t(`${key}.body`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
