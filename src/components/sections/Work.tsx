"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/portfolio-data";
import Image from "next/image";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      ease: "easeOut",
    },
  },
};

export default function Work() {
  const [selectedProject, setSelectedProject] =
    useState<(typeof projects)[0] | null>(null);

  return (
    <SectionHeading
      id="work"
      title="My Work"
      subtitle="A selection of projects I've built and contributed to"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card
              className="h-full glass overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 py-0"
              onClick={() => setSelectedProject(project)}
            >
              {/* PROJECT IMAGE */}
              <div className="relative h-48 overflow-hidden">
                {project.image ? (
                  <Image
  src={project.image}
  alt={project.title}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover transition-transform duration-500 group-hover:scale-105"
/>
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} ${project.gradientDark}`}
                  />
                )}

                {/* center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center">
                    <span className="text-xl font-bold gradient-text">
                      {project.title
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>

                {/* hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/70 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="size-5" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* LINKS */}
                <div className="flex gap-2 mt-auto pt-2">
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="size-3" />
                      Live Demo
                    </a>
                  </Button>

                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="size-3" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* PROJECT MODAL */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <>
              {/* BIG PROJECT IMAGE (IMPORTANT PART) */}
              <div className="relative h-72 w-full overflow-hidden">
                {selectedProject.image ? (
                  <Image
  src={selectedProject.image}
  alt={selectedProject.title}
  fill
  sizes="100vw"
  className="object-cover"
/>
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${selectedProject.gradient} ${selectedProject.gradientDark}`}
                  />
                )}
              </div>

              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Details about {selectedProject.title}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex flex-col gap-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>

                  {/* FEATURES */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">
                      Key Features
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* TECH STACK */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-2">
                    <Button asChild>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="size-4" />
                        Live Demo
                      </a>
                    </Button>

                    <Button variant="outline" asChild>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="size-4" />
                        View Source
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SectionHeading>
  );
}