"use client";

import { motion, Variants } from "framer-motion";
import { Globe, Brain, Palette, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/lib/portfolio-data";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Brain,
  Palette,
};

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

export default function Services() {
  return (
    <SectionHeading
      id="services"
      title="Services"
      subtitle="What I can do for you"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Globe;

          return (
            <motion.div
              key={service.title}
              variants={item}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full glass hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 py-0 overflow-hidden group">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionHeading>
  );
}
