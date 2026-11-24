import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { htmlLang } from "./translations";
import { PreferencesProvider, usePreferences } from "./contexts/PreferencesContext";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "48x48 32x32 16x16" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@400..600&family=Geist+Mono:wght@500&family=Instrument+Serif:ital@1&display=swap",
  },
];

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = usePreferences();

  return (
    <html lang={htmlLang[language]}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PreferencesProvider>
      <LayoutContent>{children}</LayoutContent>
    </PreferencesProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="wrap py-16">
      <h1 className="text-display font-semibold mb-4">{message}</h1>
      <p className="text-body-l text-fg-2">{details}</p>
      {stack && (
        <pre className="w-full mt-6 p-4 overflow-x-auto rounded-md border border-hair bg-surface font-mono text-small">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
