/**
 * types/index.ts
 * All shared TypeScript types. Data lives in data/portfolio.ts.
 */

// Re-export types that are defined inline in data/portfolio.ts
export type {
  Project,
  ProjectCategory,
  Skill,
  SkillCategory,
  TimelineItem,
  Certificate,
  CertificateStatus,
  Education,
} from "@/data/portfolio";

// ── GitHub API ────────────────────────────────────────────────
export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export interface GitHubData {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  totalStars: number;
  loading: boolean;
  error: string | null;
}

// ── Navigation ────────────────────────────────────────────────
export interface NavItem {
  readonly label: string;
  readonly href: string;
}

// ── Form ──────────────────────────────────────────────────────
export type FormStatus = "idle" | "sending" | "success" | "error";

export interface ContactFormData {
  from_name: string;
  from_email: string;
  message: string;
}

export interface FormErrors {
  from_name?: string;
  from_email?: string;
  message?: string;
}
