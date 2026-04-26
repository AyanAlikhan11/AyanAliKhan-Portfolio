"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import DottedGrid from "@/components/DottedGrid";
import { siteConfig } from "@/lib/portfolio-data";
import { Item } from "@radix-ui/react-accordion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut", // ✅ FIXED (no TS error)
    },
  },
};

export default function Hero() {
  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 pt-14 md:pt-16 overflow-hidden"
    >
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 z-0">
        <DottedGrid />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.div variants={item}>
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm font-medium gap-2 w-fit glass"
            >
              {siteConfig.available && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
              Available for work
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight font-heading"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">{siteConfig.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl sm:text-2xl text-muted-foreground font-medium"
          >
            {siteConfig.role}
          </motion.p>

          <motion.p
            variants={item}
            className="text-muted-foreground text-lg max-w-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-3 mt-2"
          >
            <Button
              size="lg"
              className="rounded-full px-6 font-medium"
              onClick={scrollToWork}
            >
              View My Work
              <ArrowDown className="size-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-6 font-medium glass"
              onClick={scrollToContact}
            >
              <Mail className="size-4 mr-1" />
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: Profile Image with animated circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center"
        >
          {/* Outer rotating dashed ring */}
          <motion.div
            className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full"
            style={{
              border: "1.5px dashed rgba(232, 168, 56, 0.12)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* Mid rotating ring with gradient border */}
          <motion.div
            className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(232,168,56,0.3), transparent 30%, transparent 70%, rgba(232,168,56,0.3))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbiting dot 1 */}
          <motion.div
            className="absolute"
            animate={{
              x: [0, Math.cos(0) * 170, Math.cos(Math.PI / 2) * 170, Math.cos(Math.PI) * 170, Math.cos(3 * Math.PI / 2) * 170, 0],
              y: [Math.sin(0) * 170, 0, Math.sin(Math.PI / 2) * 170, 0, Math.sin(3 * Math.PI / 2) * 170, Math.sin(0) * 170],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
              style={{ boxShadow: "0 0 12px rgba(232,168,56,0.5)" }}
            />
          </motion.div>

          {/* Orbiting dot 2 */}
          <motion.div
            className="absolute"
            animate={{
              x: [Math.cos(Math.PI) * 200, 0, Math.cos(Math.PI / 2) * 200, 0, Math.cos(3 * Math.PI / 2) * 200, Math.cos(Math.PI) * 200],
              y: [0, Math.sin(0) * 200, 0, Math.sin(Math.PI) * 200, 0, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-300 to-amber-500"
              style={{ boxShadow: "0 0 8px rgba(240,192,96,0.4)" }}
            />
          </motion.div>

          {/* Glow behind image */}
          <motion.div
            className="absolute w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full animate-float"
            style={{
              background:
                "radial-gradient(circle, rgba(232, 168, 56, 0.2) 0%, rgba(232, 168, 56, 0.05) 50%, transparent 70%)",
            }}
          />

          {/* Profile Image Container */}
          <motion.div
            className="relative z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glass ring around image */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full p-[3px] glass-strong glow-ring profile-image-reveal"
              style={{
                background: "linear-gradient(135deg, rgba(232,168,56,0.3), rgba(240,192,96,0.1), rgba(232,168,56,0.3))",
              }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/pimg.jpeg"
                  alt="Ayan ali khan"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover rounded-full"
                  priority
                />
              </div>
            </div>

            {/* Small floating badges around image */}
            <motion.div
              className="absolute top-1/2 -right-6 glass-strong rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 z-20"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <span className="text-lg">🚀</span>
              <span className="text-[10px] font-semibold">Next.js</span>
            </motion.div>
            
            <motion.div
              className="absolute -top-2 -right-2 glass-strong rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="text-lg">⚛️</span>
              <span className="text-[10px] font-semibold">React</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 glass-strong rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 z-20"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="text-lg">🤖</span>
              <span className="text-[10px] font-semibold">AI</span>
            </motion.div>

            <motion.div
  className="absolute top-10 -left-6 glass-strong rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 z-20"
  animate={{ y: [0, -5, 0] }}
  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
>
  <span className="text-lg">🌐</span>
  <span className="text-[10px] font-semibold">HTML</span>
</motion.div>
            <motion.div
  className="absolute bottom-10 -right-8 glass-strong rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 z-20"
  animate={{ x: [0, -6, 0] }}
  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
>
  <span className="text-lg">🎨</span>
  <span className="text-[10px] font-semibold">CSS</span>
</motion.div>

<motion.div
  className="absolute top-1/3 -left-10 glass-strong rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 z-20"
  animate={{ y: [0, 6, 0] }}
  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
>
  <span className="text-lg">⚙️</span>
  <span className="text-[10px] font-semibold">JavaScript</span>
</motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
