"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, CheckCircle2, Target, TrendingUp, AlertCircle } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { useLeetCode } from "@/hooks/useLeetCode";
import { LEETCODE_CONFIG } from "@/data/portfolio";

const DIFFICULTY_CONFIG = {
  easy:   { label: "Easy",   color: "#22C55E" },
  medium: { label: "Medium", color: "#F59E0B" },
  hard:   { label: "Hard",   color: "#EF4444" },
} as const;

const CIRCUMFERENCE = 2 * Math.PI * 40;

export default function LeetCode() {
  const { username, profileUrl, language } = LEETCODE_CONFIG;
  const { totalSolved, easySolved, mediumSolved, hardSolved, ranking, loading, error } = useLeetCode();

  return (
    <section id="leetcode" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="LeetCode"
          title="Problem"
          highlight=" Solving"
          description="Sharpening algorithmic thinking through consistent LeetCode practice."
          className="mb-12"
        />

        <div className="max-w-3xl mx-auto">
          {/* Loading skeleton */}
          {loading && <LeetCodeSkeleton />}

          {/* Error fallback */}
          {!loading && error && <LeetCodeFallback error={error} profileUrl={profileUrl} username={username} />}

          {/* Live stats */}
          {!loading && !error && (
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Left — animated stats */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-amber-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">LeetCode Stats</h3>
                      <p className="text-xs text-[#94A3B8]">@{username} · Live data</p>
                    </div>
                  </div>

                  {/* Progress ring */}
                  <div className="text-center mb-6">
                    <div
                      className="relative w-28 h-28 mx-auto mb-3"
                      role="img"
                      aria-label={`${totalSolved} problems solved on LeetCode`}
                    >
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                        <defs>
                          <linearGradient id="lc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F59E0B" />
                            <stop offset="100%" stopColor="#EF4444" />
                          </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <motion.circle
                          cx="50" cy="50" r="40" fill="none"
                          stroke="url(#lc-grad)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={CIRCUMFERENCE}
                          initial={{ strokeDashoffset: CIRCUMFERENCE }}
                          whileInView={{
                            strokeDashoffset: CIRCUMFERENCE * (1 - Math.min(totalSolved / 300, 1)),
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white" aria-hidden="true">{totalSolved}</span>
                        <span className="text-xs text-[#94A3B8]" aria-hidden="true">Solved</span>
                      </div>
                    </div>
                    {ranking > 0 && (
                      <p className="text-xs text-[#94A3B8]">
                        Global Rank{" "}
                        <span className="text-amber-400 font-semibold">
                          #{ranking.toLocaleString()}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Difficulty bars */}
                  <dl className="space-y-3 mt-auto">
                    {(
                      [
                        { key: "easy",   count: easySolved   },
                        { key: "medium", count: mediumSolved },
                        { key: "hard",   count: hardSolved   },
                      ] as const
                    ).map(({ key, count }) => {
                      const { label, color } = DIFFICULTY_CONFIG[key];
                      const pct = totalSolved > 0 ? (count / totalSolved) * 100 : 0;
                      return (
                        <div key={key} className="flex items-center gap-3">
                          <dt className="text-xs font-semibold w-14" style={{ color }}>{label}</dt>
                          <div
                            className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden"
                            role="progressbar"
                            aria-valuenow={count}
                            aria-valuemax={totalSolved}
                            aria-label={`${label}: ${count} problems`}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            />
                          </div>
                          <dd className="text-sm font-bold w-6 text-right" style={{ color }}>{count}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </GlassCard>
              </motion.div>

              {/* Right — heatmap card + info */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <GlassCard className="p-4 overflow-hidden">
                  <Image
                    src={`https://leetcard.jacoblin.com/${username}?theme=dark&font=Nunito&ext=heatmap`}
                    alt={`${username}'s LeetCode activity heatmap`}
                    width={500}
                    height={200}
                    className="w-full rounded-lg"
                    unoptimized
                  />
                </GlassCard>

                <GlassCard className="p-5 flex-1">
                  <dl className="space-y-3">
                    {[
                      { icon: CheckCircle2, label: "Primary Language", value: language,              color: "#F59E0B" },
                      { icon: Target,       label: "Focus Areas",      value: "Arrays · DP · Graphs", color: "#8B5CF6" },
                      { icon: TrendingUp,   label: "Total Solved",     value: `${totalSolved} problems`, color: "#3B82F6" },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}12` }}
                          aria-hidden="true"
                        >
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>
                        <div>
                          <dt className="text-xs text-[#94A3B8]">{label}</dt>
                          <dd className="text-sm font-semibold text-white">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <motion.a
                    href={profileUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="View LeetCode profile (opens in new tab)"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-sm font-medium text-amber-400 hover:border-amber-500/45 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    View LeetCode Profile
                  </motion.a>
                </GlassCard>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Skeleton ──────────────────────────────────────────────────
function LeetCodeSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 gap-6 animate-pulse" role="status" aria-label="Loading LeetCode stats">
      <div className="glass-card p-6 h-64" />
      <div className="flex flex-col gap-4">
        <div className="glass-card p-4 h-28" />
        <div className="glass-card p-5 flex-1" />
      </div>
    </div>
  );
}

// ── Fallback ──────────────────────────────────────────────────
function LeetCodeFallback({ error, profileUrl, username }: { error: string; profileUrl: string; username: string }) {
  return (
    <GlassCard className="p-8 text-center max-w-md mx-auto" role="alert">
      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" aria-hidden="true" />
      <p className="text-white font-semibold mb-1">Could not load live stats</p>
      <p className="text-[#94A3B8] text-sm mb-2">{error}</p>
      <p className="text-[#94A3B8] text-sm mb-6">
        Visit <span className="text-amber-400 font-medium">@{username}</span> on LeetCode directly.
      </p>
      <motion.a
        href={profileUrl}
        target="_blank"
        rel="noreferrer noopener"
        whileHover={{ scale: 1.02 }}
        className="btn-primary inline-flex"
        aria-label="Open LeetCode profile"
      >
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
        Open LeetCode Profile
      </motion.a>
    </GlassCard>
  );
}
