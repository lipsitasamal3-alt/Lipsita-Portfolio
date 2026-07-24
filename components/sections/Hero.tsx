"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, Download, ExternalLink, Code2, Braces, Terminal, Cpu, Layers, Zap } from "lucide-react";
import { PERSONAL, SOCIAL_LINKS } from "@/data/portfolio";

const FLOATING_ICONS = [
  { Icon: Code2,    x: "8%",  y: "22%", delay: 0,   size: 20 },
  { Icon: Braces,   x: "84%", y: "16%", delay: 0.5, size: 17 },
  { Icon: Terminal, x: "76%", y: "68%", delay: 1,   size: 21 },
  { Icon: Cpu,      x: "14%", y: "72%", delay: 1.5, size: 17 },
  { Icon: Layers,   x: "48%", y: "82%", delay: 0.3, size: 15 },
  { Icon: Zap,      x: "4%",  y: "48%", delay: 0.8, size: 13 },
  { Icon: Code2,    x: "91%", y: "44%", delay: 1.2, size: 15 },
] as const;

const SOCIAL_ICONS = [
  { Icon: Github,   href: SOCIAL_LINKS.github,              label: "GitHub profile" },
  { Icon: Linkedin, href: SOCIAL_LINKS.linkedin,            label: "LinkedIn profile" },
  { Icon: Mail,     href: `mailto:${SOCIAL_LINKS.email}`,   label: "Send email" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0d1730] to-[#0B1120]" />

        {/* Blobs */}
        <motion.div
          animate={{ x: [0, 35, -18, 0], y: [0, -55, 28, 0], scale: [1, 1.08, 0.93, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="blob w-[560px] h-[560px] -top-28 -left-28 bg-blue-600"
          style={{ opacity: 0.11 }}
        />
        <motion.div
          animate={{ x: [0, -44, 28, 0], y: [0, 38, -44, 0], scale: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="blob w-[480px] h-[480px] -bottom-28 -right-16 bg-purple-600"
          style={{ opacity: 0.09 }}
        />
        <motion.div
          animate={{ x: [0, 25, -35, 0], y: [0, 44, -25, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          className="blob w-[280px] h-[280px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500"
          style={{ opacity: 0.06 }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Floating code icons ── */}
      <div aria-hidden="true">
        {FLOATING_ICONS.map(({ Icon, x, y, delay, size }, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: x, top: y }}
            animate={{ y: [0, -14, 0], opacity: [0.12, 0.25, 0.12] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay, ease: "easeInOut" }}
          >
            <Icon style={{ width: size, height: size }} className="text-blue-400" />
          </motion.div>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container-max text-center pt-24 pb-16">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-white/10 text-sm text-[#94A3B8]"
          aria-label={PERSONAL.availability}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          {PERSONAL.availability}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4"
        >
          <span className="text-white">{PERSONAL.firstName} </span>
          <span className="gradient-text">{PERSONAL.lastName}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10 flex items-center justify-center gap-2"
          aria-live="polite"
          aria-label="Current focus area"
        >
          <span className="text-[#94A3B8]">I build</span>
          <TypeAnimation
            sequence={[
              "full-stack web apps.", 1800,
              "AI-powered solutions.", 1800,
              "data analytics tools.", 1800,
              "scalable REST APIs.", 1800,
              "elegant interfaces.", 1800,
            ]}
            wrapper="span"
            cursor
            repeat={Infinity}
            className="gradient-text-bp"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="text-[#94A3B8] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {PERSONAL.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <motion.button
            onClick={() => scrollTo("projects")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            View Projects
          </motion.button>

          <motion.a
            href={PERSONAL.resumePath}
            download
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline"
            aria-label="Download resume PDF"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download Resume
          </motion.a>

          <motion.button
            onClick={() => scrollTo("contact")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-20"
          aria-label="Social profiles"
        >
          {SOCIAL_ICONS.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={label}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-blue-500/40 hover:shadow-[0_0_16px_rgba(59,130,246,0.2)] transition-all"
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-[#94A3B8] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-3 rounded-full bg-gradient-to-b from-blue-400 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
