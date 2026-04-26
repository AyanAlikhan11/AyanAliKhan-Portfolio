"use client";

import { useState, useEffect, useSyncExternalStore, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Home,
  User,
  Layers,
  Briefcase,
  Mail,
  Github,
  Download,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const navIcons = [Home, User, Layers, Briefcase, Mail];

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return now;
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();
  const clock = useClock();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const clockString = useMemo(() => {
    const day = clock.toLocaleDateString("en-US", { weekday: "short" });
    const month = clock.toLocaleDateString("en-US", { month: "short" });
    const date = clock.getDate();
    const time = clock.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${day} ${month} ${date}  ${time}`;
  }, [clock]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-2 overflow-x-visible">
        {/* LEFT LOGO */}
        <motion.button
          onClick={() => scrollToSection("#home")}
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity font-heading flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">AYAN</span>
        </motion.button>

        {/* CLOCK (desktop only) */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <div className="glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground tabular-nums tracking-wide">
            {clockString}
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.replace("#", "");
            const Icon = navIcons[index];

            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors rounded-lg",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-accent rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="size-3.5 relative z-10" />
                <span className="relative z-10">{link.name}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 flex-shrink-0 flex-nowrap">
          {/* GitHub */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex rounded-full hover:bg-accent h-8 w-8"
            asChild
          >
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
            </a>
          </Button>

          {/* Resume */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex rounded-full h-8 gap-1.5 text-xs font-medium"
            asChild
          >
            <a href="/AYAN ALI KHAN_resume.pdf" download>
              <Download className="size-3.5" />
              Resume
            </a>
          </Button>

          {/* THEME TOGGLE (FIXED - ALWAYS VISIBLE) */}
          {isClient && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="rounded-full hover:bg-accent h-8 w-8 inline-flex "
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Sun className="size-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Moon className="size-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          )}

          {/* CONTACT */}
          <Button
            size="sm"
            className="hidden md:inline-flex rounded-full h-8 text-xs font-medium"
            onClick={() => scrollToSection("#contact")}
          >
            <Mail className="size-3.5 mr-1" />
            Contact
          </Button>
        </div>
      </div>
    </header>
  );
}