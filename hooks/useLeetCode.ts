"use client";

import { useEffect, useState } from "react";
import { LEETCODE_CONFIG } from "@/data/portfolio";

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  loading: boolean;
  error: string | null;
}

const EMPTY: LeetCodeStats = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  ranking: 0,
  acceptanceRate: 0,
  loading: true,
  error: null,
};

export function useLeetCode(): LeetCodeStats {
  const [data, setData] = useState<LeetCodeStats>(EMPTY);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${LEETCODE_CONFIG.username}`,
          { signal: AbortSignal.timeout(8000) }
        );

        if (!res.ok) {
          throw new Error(`LeetCode API error (${res.status}).`);
        }

        // The heroku proxy returns { status: "success"|"error", ... }
        const json = await res.json();

        if (json.status === "error") {
          throw new Error(json.message ?? "LeetCode user not found.");
        }

        if (cancelled) return;

        setData({
          totalSolved: json.totalSolved ?? 0,
          easySolved: json.easySolved ?? 0,
          mediumSolved: json.mediumSolved ?? 0,
          hardSolved: json.hardSolved ?? 0,
          ranking: json.ranking ?? 0,
          acceptanceRate: Number((json.acceptanceRate ?? 0).toFixed(1)),
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setData((prev) => ({
          ...prev,
          loading: false,
          error:
            err instanceof Error
              ? err.message
              : "Could not load LeetCode stats.",
        }));
      }
    };

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
