import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { PERSONAL, SOCIAL_LINKS } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://lipsita-portfolio.vercel.app";

export const viewport: Viewport = {
  themeColor: "#3B82F6",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${PERSONAL.name} — ${PERSONAL.title}`,
    template: `%s | ${PERSONAL.name}`,
  },
  description:
    "Portfolio of Lipsita Samal — Full-Stack Developer & AI Enthusiast. B.Tech CSE at ITER SOA University. AI Data Analytics Intern at InAmigos Foundation. Specializing in Java, React.js, Node.js, and AI-powered applications.",
  keywords: [
    "Lipsita Samal",
    "Software Developer",
    "Full Stack Developer",
    "Portfolio",
    "Java Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "MongoDB",
    "ITER SOA University",
    "CampusOS",
    "AI Developer",
    "Data Analytics",
    "InAmigos Foundation",
    "DSA",
    "Bhubaneswar",
    "Internship",
  ],
  authors: [{ name: PERSONAL.name, url: SOCIAL_LINKS.github }],
  creator: PERSONAL.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${PERSONAL.name} — ${PERSONAL.title}`,
    description:
      "Building modern web applications, solving complex problems with Java and React, and creating impactful AI-powered solutions.",
    siteName: `${PERSONAL.name} Portfolio`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${PERSONAL.name} — ${PERSONAL.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL.name} — ${PERSONAL.title}`,
    description: "Java · React.js · Node.js · AI Data Analytics — Full-Stack Developer & Intern at InAmigos Foundation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

/** JSON-LD structured data for search engines */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL.name,
  jobTitle: PERSONAL.title,
  email: PERSONAL.email,
  url: siteUrl,
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.leetcode],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#0B1120] text-[#F8FAFC] font-inter antialiased">
        {/* Skip-to-content for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
