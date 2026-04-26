import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import AIChat from "@/components/AIChat";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pb-28 md:pb-0">
      <Preloader />
      <ScrollProgress />

      {/* Desktop Navbar - hidden on mobile, MobileBottomNav handles mobile */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <Hero />
      <About />
      <Services />
      <Experience />
      <Work />
      <Testimonials />
      <Contact />
      <Footer />

      <AIChat />
      <MobileBottomNav />
    </main>
  );
}
