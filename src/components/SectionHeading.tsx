"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  id,
  title,
  subtitle,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 px-4", className)}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading">
            {title}
          </h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-2xl">{subtitle}</p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
