import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayan Ali Khan — Full-Stack Developer",
  description:
    "Portfolio of Alex Chen. Crafting digital experiences with code and creativity. Specializing in web development, AI solutions, and UI/UX design.",
  keywords: [
    "Ayan Ali Khan",
    "Full-Stack Developer",
    "Web Development",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Ayan Ali Khan" }],
  openGraph: {
    title: "Ayan Ali Khan — Full-Stack Developer",
    description: "Crafting digital experiences with code and creativity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jakarta.variable} ${jetbrainsMono.variable} font-body antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
