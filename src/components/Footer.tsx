"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Twitter, Heart, ArrowUp } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/portfolio-data";

const socialLinks = [
  { name: "GitHub", href: siteConfig.socials.github, icon: Github },
  { name: "LinkedIn", href: siteConfig.socials.linkedin, icon: Linkedin },
  { name: "Instagram", href: siteConfig.socials.instagram, icon: Instagram },
  { name: "Twitter", href: siteConfig.socials.twitter, icon: Twitter },
  { name: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <motion.button
              onClick={scrollToTop}
              className="text-xl font-bold tracking-tight font-heading w-fit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text">AC</span>
            </motion.button>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {siteConfig.tagline}. Building digital products with modern web
              technologies and a passion for clean code.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center size-9 rounded-lg glass text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold font-heading">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/AYAN ALI KHAN_resume.pdf"
                download
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                Download Resume
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold font-heading">Get in Touch</h4>
            <p className="text-sm text-muted-foreground">
              Have a project in mind? Let&apos;s talk about how I can help bring
              your ideas to life.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-medium text-primary hover:underline w-fit"
            >
              {siteConfig.email}
            </a>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for freelance work
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Built with
            <Heart className="size-3 text-red-400 inline" />
            using Next.js, Tailwind CSS &amp; Framer Motion
          </p>
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            whileHover={{ y: -1 }}
          >
            Back to top
            <ArrowUp className="size-3" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
