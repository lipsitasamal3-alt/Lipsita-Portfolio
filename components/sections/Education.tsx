"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, BookOpen, Award } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { EDUCATION, PRIOR_EDUCATION } from "@/data/portfolio";

const STATUS_LABELS: Record<"active" | "completed", { label: string; className: string }> = {
  active:    { label: "Active",    className: "bg-green-500/10 border-green-500/20 text-green-400" },
  completed: { label: "Completed", className: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
};

export default function Education() {
  const status = STATUS_LABELS[EDUCATION.status];

  return (
    <section id="education" className="section-padding-sm">
      <div className="container-max">
        <SectionHeader
          eyebrow="Education"
          title="Academic"
          highlight=" Background"
          className="mb-12"
        />

        <div className="max-w-2xl mx-auto space-y-5">
          {/* ── B.Tech Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <GlassCard className="p-8 relative overflow-hidden">
              {/* Gradient top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                aria-hidden="true"
              />
              <div className="absolute top-6 right-6 text-5xl opacity-[0.07] select-none pointer-events-none" aria-hidden="true">
                🎓
              </div>

              <div className="flex items-start gap-5">
                <div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  aria-hidden="true"
                >
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                    <div>
                      <h3 className="font-bold text-white text-xl mb-0.5">
                        {EDUCATION.institution}
                      </h3>
                      <p className="text-blue-400 font-medium text-sm">
                        {EDUCATION.degree} — {EDUCATION.field}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-semibold ${status.className}`}
                      aria-label={`Status: ${status.label}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <dl className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-sm text-[#94A3B8]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                      <dt className="sr-only">Years</dt>
                      <dd>
                        <time dateTime={EDUCATION.startYear}>{EDUCATION.startYear}</time>
                        {" — "}
                        <time dateTime={EDUCATION.endYear}>{EDUCATION.endYear}</time>
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" aria-hidden="true" />
                      <dt className="sr-only">Location</dt>
                      <dd>{EDUCATION.location}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                      <dt className="sr-only">Program</dt>
                      <dd>4-Year Undergraduate</dd>
                    </div>
                  </dl>

                  <div className="mt-5 pt-5 border-t border-white/[0.07]">
                    <p className="text-[#94A3B8] text-sm leading-relaxed">
                      {EDUCATION.description}
                    </p>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Subjects studied">
                    {EDUCATION.subjects.map((subject) => (
                      <li key={subject}>
                        <span className="tech-badge">{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Prior Education (Class X & XII) ── */}
          <div className="grid sm:grid-cols-2 gap-4">
            {PRIOR_EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 340, damping: 24 }}
                  className="glass-card p-5 relative overflow-hidden h-full"
                >
                  {/* Accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-amber-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-0.5">
                        {edu.label}
                      </p>
                      <h4 className="font-semibold text-white text-sm leading-snug mb-2">
                        {edu.school}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl font-bold text-white">{edu.score}</span>
                        <span className="text-xs text-[#94A3B8]">Score</span>
                      </div>
                    </div>
                    <span className="text-2xl" aria-hidden="true">{edu.emoji}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
