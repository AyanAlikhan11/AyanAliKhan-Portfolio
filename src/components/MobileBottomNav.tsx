"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Layers,
  Briefcase,
  Mail,
  Github,
  Download,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks, siteConfig } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const icons = [Home, User, Layers, Briefcase, Mail];

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();

  // ✅ FIX: hydration safe render
  const [mounted, setMounted] = useState(false);

if (typeof window !== "undefined" && !mounted) {
  setMounted(true);
}

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

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
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="h-12 px-4 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="text-lg font-bold tracking-tight font-heading"
          >
            <span className="gradient-text">AYAN</span>
          </button>

          {/* Right Actions */}
          <div className="flex items-center gap-1">

            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
              <a href={siteConfig.socials.github} target="_blank">
                <Github className="size-4" />
              </a>
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
              <a href="/resume.pdf" download>
                <Download className="size-4" />
              </a>
            </Button>

            {/* ✅ FIXED THEME TOGGLE */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )
              ) : (
                <Moon className="size-4 opacity-0" />
              )}
            </Button>

          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="glass-strong rounded-full px-2 py-2 max-w-md mx-auto">
          <div className="flex items-center justify-around">

            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace("#", "");
              const Icon = icons[index];

              return (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-full transition-colors min-w-[48px]",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-active"
                        className="absolute inset-0 bg-accent rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <Icon className="size-5 relative z-10" />
                  <span className="text-[10px] font-medium relative z-10">
                    {link.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </>
  );
}