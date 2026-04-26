"use client";

import { motion, Variants } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import TechIcon from "@/components/TechIcon";
import AnimatedCounter from "@/components/AnimatedCounter";
import { aboutText, skills } from "@/lib/portfolio-data";

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

// Accent colors per skill — unique, modern tones
const skillAccent: Record<string, { bg: string; text: string }> = {
  "Next.js": { bg: "from-neutral-400/15 to-neutral-500/15", text: "text-neutral-300 dark:text-neutral-200" },
  TypeScript: { bg: "from-blue-500/15 to-indigo-500/15", text: "text-blue-400" },
  "Tailwind CSS": { bg: "from-teal-500/15 to-emerald-500/15", text: "text-teal-400" },
  "Node.js": { bg: "from-green-500/15 to-emerald-600/15", text: "text-green-400" },
  Python: { bg: "from-yellow-500/15 to-amber-500/15", text: "text-yellow-400" },
  HTML: {
    bg: "from-orange-500/15 to-red-500/15",
    text: "text-orange-400",
  },
  CSS: {
    bg: "from-blue-400/15 to-sky-500/15",
    text: "text-sky-400",
  },
  Firebase: {
    bg: "from-amber-500/15 to-yellow-600/15",
    text: "text-amber-400",
  },

  C: {
    bg: "from-slate-500/15 to-gray-600/15",
    text: "text-slate-300",
  },
  JavaScript: {
    bg: "from-yellow-400/15 to-yellow-600/15",
    text: "text-yellow-300",
  },
};

const stats = [
  { value: 1, suffix: "+", label: "Years Exp." },
  { value: 6, suffix: "+", label: "Projects" },
  { value: 3, suffix: "+", label: "Clients" },
];

export default function About() {
  return (
    <SectionHeading
      id="about"
      title="About Me"
      subtitle="A glimpse into who I am and what drives me"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-xl font-semibold font-heading">{aboutText.headline}</h3>
          {aboutText.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Stats with Animated Counters */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 sm:p-4 rounded-xl glass"
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3"
        >
          {skills.map((skill) => {
            const accent = skillAccent[skill.name] || {
              bg: "from-gray-500/15 to-gray-500/15",
              text: "text-gray-400",
            };

            return (
              <motion.div
                key={skill.name}
                variants={item}
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative p-3 sm:p-4 rounded-xl glass bg-gradient-to-br ${accent.bg} cursor-default group`}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className={`transition-all duration-300 ${accent.text} opacity-70 group-hover:opacity-100 group-hover:drop-shadow-sm`}>
                    <TechIcon name={skill.name} size={30} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">{skill.name}</span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionHeading>
  );
}
