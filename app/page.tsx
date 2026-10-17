import About from "@/components/About";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Judges from "@/components/Judges";
import Nav from "@/components/Nav";
import Prizes from "@/components/Prizes";
import Rules from "@/components/Rules";
import Sponsors from "@/components/Sponsors";
import Submission from "@/components/Submission";
import Timeline from "@/components/Timeline";
import Tracks from "@/components/Tracks";
import Venue from "@/components/Venue";

// Neon redesign in progress. Still to come (old versions live in components/):
// mentors and the day-by-day schedule.
export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-magenta focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Tracks />
        <Timeline />
        <Prizes />
        <Judges />
        <Rules />
        <Submission />
        <Venue />
        <Sponsors />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
