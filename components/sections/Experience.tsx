"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { TIMELINE, type TimelineItem } from "@/data/portfolio";


const TYPE_COLORS: Record<NonNullable<TimelineItem["type"]>, string> = {
  work:        "#06B6D4",
  project:     "#8B5CF6",
  education:   "#3B82F6",
  achievement: "#F59E0B",
};

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Journey"
          title="My Development"
          highlight=" Timeline"
          description="Internships, projects, and key milestones that shaped my path as a developer."
          className="mb-14"
        />

        <ol className="relative max-w-3xl mx-auto" aria-label="Career and education timeline">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/35 to-transparent md:-translate-x-px"
            aria-hidden="true"
          />

          {TIMELINE.map((item, i) => {
            const isEven = i % 2 === 0;
            const itemType = item.type ?? "project";
            const color = TYPE_COLORS[itemType];
            const isWork = item.type === "work";

            return (
              <motion.li
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: isEven ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`relative flex md:items-center gap-8 mb-10 last:mb-0 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div className="pl-16 md:pl-0 md:w-[calc(50%-32px)]">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 340, damping: 24 }}
                    className={`glass-card p-6 relative overflow-hidden ${isEven ? "md:text-right" : "md:text-left"}`}
                  >
                    {/* Color accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                      aria-hidden="true"
                    />

                    {/* Work internship badge */}
                    {isWork && (
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${
                          isEven ? "md:float-right md:ml-2" : ""
                        }`}
                        style={{
                          backgroundColor: `${color}12`,
                          border: `1px solid ${color}30`,
                          color,
                        }}
                      >
                        <Briefcase className="w-2.5 h-2.5" aria-hidden="true" />
                        Internship
                      </div>
                    )}

                    <time
                      dateTime={item.year.replace(/\D.*/, "")}
                      className="text-xs font-bold tracking-widest uppercase block mb-0.5 clear-both"
                      style={{ color }}
                    >
                      {item.year}
                    </time>

                    {item.organization && (
                      <p className="text-xs text-[#94A3B8] mb-1 font-medium">
                        {item.organization}
                      </p>
                    )}

                    <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <ul
                        className={`flex flex-wrap gap-1.5 ${isEven ? "md:justify-end" : ""}`}
                        aria-label="Related technologies"
                      >
                        {item.tags.map((tag) => (
                          <li key={tag}>
                            <span className="tech-badge text-[0.65rem]">{tag}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </div>

                {/* Center dot */}
                <div
                  className="absolute left-6 md:left-1/2 top-6 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10"
                  aria-hidden="true"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}99)`,
                      boxShadow: `0 0 0 3px ${color}22, 0 0 16px ${color}40`,
                    }}
                  >
                    {item.emoji}
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-[calc(50%-32px)]" aria-hidden="true" />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
