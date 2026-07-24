"use client";

import { type ElementType } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Cpu, Heart, Rocket, BookOpen, Briefcase } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { PERSONAL, EDUCATION, ABOUT_STATS, ABOUT_PASSIONS, ACHIEVEMENTS, SPOKEN_LANGUAGES } from "@/data/portfolio";

const ICON_MAP: Record<string, ElementType> = {
  BookOpen, Rocket, GraduationCap, Code2, Briefcase,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: "easeOut" } },
};

const ABOUT_CARDS = [
  {
    title: "Education",
    icon: GraduationCap,
    color: "blue",
    colorClass: "bg-blue-500/10 border-blue-500/20",
    iconClass: "text-blue-400",
    text: `B.Tech Computer Science Engineering at ITER SOA University, Bhubaneswar (${EDUCATION.startYear}–${EDUCATION.endYear}). Building a strong foundation in algorithms, data structures, and software engineering.`,
    highlight: [{ word: "ITER SOA University", color: "text-blue-400" }],
  },
  {
    title: "What I Do",
    icon: Code2,
    color: "purple",
    colorClass: "bg-purple-500/10 border-purple-500/20",
    iconClass: "text-purple-400",
    text: "I specialize in building full-stack web applications using React & Next.js on the frontend, Node.js on the backend, and Java for competitive programming & backend systems.",
  },
  {
    title: "AI & Innovation",
    icon: Cpu,
    color: "cyan",
    colorClass: "bg-cyan-500/10 border-cyan-500/20",
    iconClass: "text-cyan-400",
    text: "Passionate about integrating AI into real-world applications — from CGPA prediction models to algorithmic trading bots. Oracle-certified in Agentic AI Foundations.",
  },
  {
    title: "Why I Code",
    icon: Heart,
    color: "pink",
    colorClass: "bg-pink-500/10 border-pink-500/20",
    iconClass: "text-pink-400",
    text: "I believe technology should solve real problems. Every project I build is an attempt to make someone's life easier, smarter, or more productive. Currently seeking internship opportunities to grow and contribute.",
  },
] as const;

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="About Me"
          title="Passionate Developer &"
          highlight=" Problem Solver"
          description={PERSONAL.bio}
          className="mb-14"
        />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — Info cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-4"
          >
            {ABOUT_CARDS.map(({ title, icon: Icon, colorClass, iconClass, text }) => (
              <motion.div key={title} variants={itemVariants}>
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl ${colorClass} border flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${iconClass}`} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1.5">{title}</h3>
                      <p className="text-[#94A3B8] text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Stats & Passions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4" role="list" aria-label="Quick stats">
              {ABOUT_STATS.map((stat, i) => {
                const Icon = ICON_MAP[stat.iconName] || BookOpen;
                return (
                  <motion.div
                    key={stat.label}
                    role="listitem"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.38 }}
                    whileHover={{ scale: 1.04, y: -3 }}
                  >
                    <GlassCard className="p-5 text-center" glow={`${stat.color}28`}>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                        style={{
                          backgroundColor: `${stat.color}14`,
                          border: `1px solid ${stat.color}28`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: stat.color }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                      <div className="text-xs text-[#94A3B8] font-medium">{stat.label}</div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Passions */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest text-[#94A3B8]">
                What I&apos;m Passionate About
              </h3>
              <div className="flex flex-wrap gap-2.5" role="list" aria-label="Areas of passion">
                {ABOUT_PASSIONS.map((passion, i) => (
                  <motion.span
                    key={passion.label}
                    role="listitem"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ scale: 1.07, y: -2 }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass border border-white/10 text-sm text-[#94A3B8] hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 cursor-default transition-all"
                  >
                    <span aria-hidden="true">{passion.emoji}</span>
                    <span className="font-medium">{passion.label}</span>
                  </motion.span>
                ))}
              </div>
            </GlassCard>


            {/* Achievements + Languages row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Achievements */}
              <GlassCard className="p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Awards</h3>
                <ul className="space-y-2.5">
                  {ACHIEVEMENTS.map((ach) => (
                    <li key={ach.title} className="flex items-start gap-2">
                      <span className="text-base flex-shrink-0 mt-0.5" aria-hidden="true">{ach.emoji}</span>
                      <div>
                        <p className="text-xs font-semibold text-white leading-snug">{ach.title}</p>
                        <p className="text-[0.65rem] text-[#94A3B8] leading-relaxed mt-0.5">{ach.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Languages */}
              <GlassCard className="p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Languages</h3>
                <ul className="space-y-2.5">
                  {SPOKEN_LANGUAGES.map((lang) => (
                    <li key={lang.language} className="flex items-center gap-2">
                      <span className="text-base" aria-hidden="true">{lang.emoji}</span>
                      <div>
                        <p className="text-xs font-semibold text-white">{lang.language}</p>
                        <p className="text-[0.65rem] text-[#94A3B8]">{lang.level}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* Availability Banner */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-2xl border border-green-500/20 bg-green-500/[0.05] flex items-center gap-4"
              role="status"
              aria-label="Currently available for opportunities"
            >
              <span className="relative flex-shrink-0" aria-hidden="true">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                </span>
              </span>
              <div>
                <p className="text-sm font-semibold text-green-400">Available for Opportunities</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Currently seeking internships in software development &amp; AI
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
