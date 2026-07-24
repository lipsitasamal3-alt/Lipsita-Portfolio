"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, CheckCircle2, Calendar } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { PROJECTS, type Project } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Projects"
          title="Things I've"
          highlight=" Built"
          description="Real-world projects built from scratch — full-stack platforms and AI-powered bots."
          className="mb-14"
        />

        <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto" role="list" aria-label="Projects">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              role="listitem"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Project Card ───────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const isFullstack = project.category === "fullstack";
  const gradientFrom = isFullstack ? "from-blue-500" : "from-purple-500";
  const gradientTo   = isFullstack ? "to-cyan-500"   : "to-pink-500";
  const accentColor  = isFullstack ? "#3B82F6"        : "#8B5CF6";

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="glass-card flex flex-col h-full relative overflow-hidden group"
      aria-label={`${project.title} — project`}
    >
      {/* Animated top gradient bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
        aria-hidden="true"
      />

      {/* Subtle background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${accentColor}06 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="p-7 pb-5 relative">
        <div className="flex items-start gap-4 mb-4">
          {/* Emoji icon */}
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientFrom}/15 ${gradientTo}/15 border border-white/10 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
            aria-hidden="true"
          >
            {project.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-white text-xl">{project.title}</h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <Calendar className="w-3 h-3" aria-hidden="true" />
              <time dateTime={project.date}>{project.date}</time>
              <span className="mx-1 opacity-40">·</span>
              <span className="capitalize">{project.category}</span>
            </div>
          </div>
        </div>

        <p className="text-[#94A3B8] text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Feature highlights */}
      <div className="px-7 pb-5 relative flex-1">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
          Key Features
        </p>
        <ul className="space-y-2" aria-label="Project features">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-[#94A3B8]">
              <CheckCircle2
                className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                style={{ color: accentColor }}
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack */}
      <div className="px-7 pb-5 relative">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
                style={{
                  backgroundColor: `${accentColor}0d`,
                  borderColor: `${accentColor}25`,
                  color: "#94A3B8",
                }}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action buttons */}
      <div className="px-7 pb-7 relative flex gap-3">
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View ${project.title} source code on GitHub`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-white/10 text-sm font-medium text-[#94A3B8] hover:text-white hover:border-white/25 transition-all"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            GitHub
          </motion.a>
        )}
        {project.live && (
          <motion.a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${project.title} live demo`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} text-sm font-medium text-white shadow-[0_4px_16px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_28px_rgba(59,130,246,0.45)] transition-shadow`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Live Demo
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}
