import { Analytics } from "@vercel/analytics/react";
import { useLenis } from "./lib/useLenis";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
// Services section hidden for now — needs licensed / own imagery before it ships.
// To re-enable: uncomment this import and the <Services /> line below, and the
// "Services" link in Navbar.tsx. Component file is kept intact.
// import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Results } from "./components/Results";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";

function Marquee() {
  const items = [
    "Video Production",
    "Photography",
    "Brand Strategy",
    "Social Media",
    "Creative Marketing",
    "Video Editing",
  ];
  const row = [...items, ...items];
  return (
    <div className="border-y border-black/8 bg-paper py-6 md:py-8">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-2xl font-bold tracking-tightest text-ink/80 md:text-4xl">
                {t}
              </span>
              <span className="h-2 w-2 rounded-full bg-honey" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-offwhite">
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Marquee />
        {/* <Services /> — hidden until we have imagery we can use */}
        <Portfolio />
        <Pricing />
        <Results />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
