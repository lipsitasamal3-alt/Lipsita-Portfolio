"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import GitHubSection from "@/components/sections/GitHub";
import LeetCode from "@/components/sections/LeetCode";
import Certificates from "@/components/sections/Certificates";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

// Lazy-load the loading screen — it's self-dismissing
const LoadingScreen = dynamic(
  () => import("@/components/shared/LoadingScreen"),
  { ssr: false }
);

// ── Cursor Glow (desktop only) ────────────────────────────────
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="cursor-glow hidden lg:block"
      aria-hidden="true"
    />
  );
}

// ── Main Page ────────────────────────────────────────────────
export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {/* Self-dismissing loading screen — fixes the "never exits" bug */}
      <LoadingScreen onComplete={() => setReady(true)} />

      {/* Main content fades in after loading */}
      <div
        className="transition-opacity duration-500"
        style={{ opacity: ready ? 1 : 0 }}
      >
        {/* Atmospheric noise texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Desktop cursor glow */}
        <CursorGlow />

        <Navbar />

        <main id="main-content" tabIndex={-1}>
          <Hero />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <Experience />
          <div className="section-divider" />
          <GitHubSection />
          <div className="section-divider" />
          <LeetCode />
          <div className="section-divider" />
          <Certificates />
          <div className="section-divider" />
          <Education />
          <div className="section-divider" />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
