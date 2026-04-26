"use client";

import { motion, Variants } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/lib/portfolio-data";

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

export default function Experience() {
  return (
    <SectionHeading
      id="experience"
      title="Experience"
      subtitle="My professional journey and the companies I've contributed to"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-3xl"
      >
        {/* Timeline line */}
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-px" />

        {experience.map((exp, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={exp.company}
              variants={item}
              className={`relative flex items-start gap-6 mb-8 last:mb-0 md:mb-12 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 z-10">
                <div className="w-9 h-9 rounded-full glass-strong flex items-center justify-center">
                  <Briefcase className="size-4 text-primary" />
                </div>
              </div>

              {/* Card - Mobile: always right of dot */}
              {/* Card - Desktop: alternating left/right */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-28px)] ${
                  isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                } w-full`}
              >
                <motion.div
                  whileHover={{ y: -2, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-xl p-5 group hover:shadow-lg hover:shadow-primary/5 transition-shadow"
                >
                  {/* Period badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-medium px-2 py-0.5"
                    >
                      {exp.period}
                    </Badge>
                    {exp.companyUrl && exp.companyUrl !== "#" && (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="size-3 text-muted-foreground" />
                      </a>
                    )}
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-base font-semibold font-heading">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-0.5">
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-[9px] font-medium px-1.5 py-0"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionHeading>
  );
}
