"use client";

import { motion } from "framer-motion";
import { GitFork, Star, ExternalLink, GitBranch, AlertCircle, Github } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { useGitHub } from "@/hooks/useGitHub";
import { GITHUB_CONFIG, SOCIAL_LINKS } from "@/data/portfolio";
import { LANGUAGE_COLORS, getRelativeTime } from "@/lib/utils";

export default function GitHubSection() {
  const { user, repos, totalStars, loading, error } = useGitHub();

  return (
    <section id="github" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="GitHub"
          title="Open Source &"
          highlight=" Contributions"
          description="My GitHub activity, repositories, and open-source work."
          className="mb-12"
        />

        {loading && <GitHubSkeleton />}

        {!loading && error && <GitHubFallback error={error} />}

        {!loading && !error && user && (
          <>
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <GlassCard className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-blue-500/25 flex-shrink-0">
                    <Image
                      src={user.avatar_url}
                      alt={`${user.name ?? user.login}'s GitHub avatar`}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <h3 className="font-bold text-white text-xl">
                      {user.name ?? user.login}
                    </h3>
                    <p className="text-blue-400 text-sm mb-2">@{user.login}</p>
                    {user.bio && (
                      <p className="text-[#94A3B8] text-sm mb-3 line-clamp-2">{user.bio}</p>
                    )}
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="View GitHub profile (opens in new tab)"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:underline focus-visible:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      View GitHub Profile
                    </a>
                  </div>

                  {/* Stats */}
                  <dl className="flex sm:flex-col gap-6 sm:gap-3 text-center sm:text-right flex-shrink-0">
                    {[
                      { label: "Repos", value: user.public_repos },
                      { label: "Followers", value: user.followers },
                      { label: "Total Stars", value: totalStars },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-xs text-[#94A3B8]">{label}</dt>
                        <dd className="text-2xl font-bold text-white">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </GlassCard>
            </motion.div>

            {/* Stats Card from GitHub Readme Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <GlassCard className="p-6">
                <h3 className="font-semibold text-white mb-4 text-sm flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-green-400" aria-hidden="true" />
                  GitHub Stats
                </h3>
                <div className="flex justify-center overflow-x-auto">
                  <Image
                    src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_CONFIG.username}&show_icons=true&theme=transparent&hide_border=true&title_color=3B82F6&text_color=94A3B8&icon_color=8B5CF6&bg_color=00000000`}
                    alt={`${GITHUB_CONFIG.username}'s GitHub statistics`}
                    width={495}
                    height={165}
                    className="max-w-full"
                    unoptimized
                  />
                </div>
              </GlassCard>
            </motion.div>

            {/* Repo Cards */}
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              role="list"
              aria-label="GitHub repositories"
            >
              {repos.map((repo, i) => (
                <motion.div
                  key={repo.id}
                  role="listitem"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${repo.name} repository — ${repo.description ?? "No description"}`}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 340, damping: 24 }}
                    className="glass-card p-5 flex flex-col gap-3 h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-white text-sm truncate flex-1">
                        {repo.name}
                      </h4>
                      <ExternalLink
                        className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="text-[#94A3B8] text-xs leading-relaxed flex-1 line-clamp-2">
                      {repo.description ?? "No description available."}
                    </p>

                    <dl className="flex items-center gap-4 text-xs text-[#94A3B8]">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#888" }}
                            aria-hidden="true"
                          />
                          <dt className="sr-only">Language</dt>
                          <dd>{repo.language}</dd>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" aria-hidden="true" />
                        <dt className="sr-only">Stars</dt>
                        <dd>{repo.stargazers_count}</dd>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" aria-hidden="true" />
                        <dt className="sr-only">Forks</dt>
                        <dd>{repo.forks_count}</dd>
                      </div>
                      <dd className="ml-auto opacity-55 text-[0.65rem]">
                        {getRelativeTime(repo.updated_at)}
                      </dd>
                    </dl>
                  </motion.a>
                </motion.div>
              ))}
            </div>

            {/* View all */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-outline inline-flex"
                aria-label="View all GitHub repositories (opens in new tab)"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                View All Repositories
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

// ── Skeleton ───────────────────────────────────────────────────
function GitHubSkeleton() {
  return (
    <div className="space-y-5 animate-pulse" aria-label="Loading GitHub data" role="status">
      <div className="glass-card p-6 h-28" />
      <div className="glass-card p-6 h-20" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card p-5 h-28" />
        ))}
      </div>
    </div>
  );
}

// ── Fallback ───────────────────────────────────────────────────
function GitHubFallback({ error }: { error: string }) {
  return (
    <GlassCard className="p-8 text-center" role="alert">
      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" aria-hidden="true" />
      <p className="text-[#94A3B8] mb-1 text-sm">{error}</p>
      <p className="text-[#94A3B8] text-sm mb-5">Visit the profile directly below.</p>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noreferrer noopener"
        className="btn-primary inline-flex"
      >
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
        Open GitHub Profile
      </a>
    </GlassCard>
  );
}
