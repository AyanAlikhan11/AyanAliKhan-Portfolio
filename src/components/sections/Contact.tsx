"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Linkedin, Instagram, Mail, Github, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";
import { siteConfig } from "@/lib/portfolio-data";

const socialLinks = [
  {
    name: "LinkedIn",
    href: siteConfig.socials.linkedin,
    icon: Linkedin,
    color: "hover:text-blue-400 hover:shadow-blue-500/20",
  },
  {
    name: "Instagram",
    href: siteConfig.socials.instagram,
    icon: Instagram,
    color: "hover:text-pink-400 hover:shadow-pink-500/20",
  },
  {
    name: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    color: "hover:text-amber-400 hover:shadow-amber-500/20",
  },
  {
    name: "GitHub",
    href: siteConfig.socials.github,
    icon: Github,
    color: "hover:text-neutral-300 hover:shadow-neutral-400/20",
  },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent successfully!", {
          description: "Thanks for reaching out. I'll get back to you soon!",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or email me directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionHeading
      id="contact"
      title="Get in Touch"
      subtitle="Have a project in mind? Let's build something great together."
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg mx-auto flex flex-col gap-6"
      >
        <Card className="glass overflow-hidden py-0">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium"
                >
                  Name
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="rounded-lg bg-background/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="rounded-lg bg-background/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="rounded-lg bg-background/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full font-medium mt-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social Connect */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground font-medium">
            Or connect with me directly
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative flex items-center justify-center size-11 rounded-xl glass transition-all duration-300 text-muted-foreground ${social.color} hover:shadow-lg`}
                aria-label={social.name}
              >
                <social.icon className="size-[18px]" />
                <ArrowUpRight className="size-3 absolute -top-0.5 -right-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionHeading>
  );
}
