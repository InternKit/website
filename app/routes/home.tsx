import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { PlatformSection } from "../components/PlatformSection";
import { InsightsSection } from "../components/InsightsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Internkit - Where experience meets career opportunities" },
    { name: "description", content: "Learn expert tips at your exponential edge with real-life career strategy advice." },
  ];
}

export default function Home() {
  return (
    <>
      <svg width='0' height='0' aria-hidden='true'>
        <filter id='grain' colorInterpolationFilters='sRGB'>
          <feTurbulence type='fractalNoise' baseFrequency='.9713' numOctaves='4'/>
          <feDisplacementMap in='SourceGraphic' scale='150' xChannelSelector='R'/>
        </filter>
      </svg>
      <Header />
      <Hero />
      <PlatformSection />
      <InsightsSection columns={2} />

      {/* Testimonials Section will be added once we have some testimonials */}
      {/* <TestimonialsSection /> */}
      <Footer />
    </>
  );
}
