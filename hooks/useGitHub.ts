"use client";

import { useEffect, useState } from "react";
import type { GitHubData, GitHubUser, GitHubRepo } from "@/types";
import { GITHUB_CONFIG } from "@/data/portfolio";

export function useGitHub(): GitHubData {
  const [data, setData] = useState<GitHubData>({
    user: null,
    repos: [],
    totalStars: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_CONFIG.username}`, {
            headers: { Accept: "application/vnd.github.v3+json" },
          }),
          fetch(
            `https://api.github.com/users/${GITHUB_CONFIG.username}/repos?sort=pushed&per_page=${GITHUB_CONFIG.reposToShow}&type=owner`,
            { headers: { Accept: "application/vnd.github.v3+json" } }
          ),
        ]);

        // Surface specific API error messages
        if (!userRes.ok) {
          const msg = userRes.status === 404
            ? "GitHub user not found."
            : userRes.status === 403
            ? "GitHub API rate limit reached."
            : `GitHub API error (${userRes.status}).`;
          throw new Error(msg);
        }
        if (!reposRes.ok) {
          throw new Error(`GitHub repos error (${reposRes.status}).`);
        }

        // Guard against non-JSON responses (e.g., Cloudflare HTML error pages)
        const contentType = userRes.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
          throw new Error("Unexpected response from GitHub API.");
        }

        const [user, repos]: [GitHubUser, GitHubRepo[]] = await Promise.all([
          userRes.json(),
          reposRes.json(),
        ]);

        if (cancelled) return;

        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

        setData({
          user,
          repos: repos.filter((r) => !r.fork),
          totalStars,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setData((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load GitHub data.",
        }));
      }
    };

    fetchGitHub();
    return () => { cancelled = true; };
  }, []);

  return data;
}
