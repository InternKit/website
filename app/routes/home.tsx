import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { SyncSection } from "../components/SyncSection";
import { PlatformSection } from "../components/PlatformSection";
import { InsightsSection } from "../components/InsightsSection";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "InternKit – AI CV screening for small tech teams" },
    { name: "description", content: "Your open positions sync automatically and every application gets a suitability score, strengths and risks. No setup, no manual uploads." },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SyncSection />
        <PlatformSection />
        <InsightsSection />
      </main>

      <Footer />
    </>
  );
}
