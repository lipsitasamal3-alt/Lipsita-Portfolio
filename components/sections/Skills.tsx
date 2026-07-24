"use client";

import { type ElementType } from "react";
import { motion } from "framer-motion";
import { Code2, Monitor, Server, Database, Wrench, Lightbulb } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SKILL_CATEGORIES } from "@/data/portfolio";

const ICON_MAP: Record<string, ElementType> = {
  Code2, Monitor, Server, Database, Wrench, Lightbulb,
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Skills"
          title="Technologies I"
          highlight=" Work With"
          description="A curated toolkit of languages, frameworks, and tools I use to build modern applications."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, catIndex) => {
            const CatIcon = ICON_MAP[cat.iconName] ?? Code2;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.48, delay: catIndex * 0.09 }}
              >
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="glass-card p-6 h-full"
                  aria-label={`${cat.category} skills`}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-70"
                    style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                    aria-hidden="true"
                  />

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${cat.color}12`,
                        border: `1px solid ${cat.color}28`,
                      }}
                    >
                      <CatIcon
                        className="w-5 h-5"
                        style={{ color: cat.color }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm">{cat.category}</h3>
                      <p className="text-xs text-[#94A3B8]">{cat.skills.length} technologies</p>
                    </div>
                    <div
                      className="h-px w-8 opacity-50"
                      style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Skill pills */}
                  <ul className="flex flex-wrap gap-2" role="list" aria-label={`${cat.category} technologies`}>
                    {cat.skills.map((skill) => (
                      <motion.li
                        key={skill.name}
                        whileHover={{
                          scale: 1.07,
                          y: -2,
                          boxShadow: `0 4px 12px ${cat.color}28`,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-default select-none"
                        style={{
                          background: `${cat.color}0e`,
                          border: `1px solid ${cat.color}22`,
                          color: "#94A3B8",
                          transition: "color 0.2s ease, border-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = cat.color;
                          (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}55`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                          (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}22`;
                        }}
                      >
                        <span aria-hidden="true">{skill.emoji}</span>
                        <span>{skill.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-[#94A3B8] text-sm"
        >
          Always learning ·{" "}
          <span className="text-blue-400">Currently exploring:</span>{" "}
          Next.js 15 · TypeScript · Docker · System Design
        </motion.p>
      </div>
    </section>
  );
}
