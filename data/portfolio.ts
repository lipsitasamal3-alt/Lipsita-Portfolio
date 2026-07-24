/**
 * ============================================================
 * PORTFOLIO DATA — SINGLE SOURCE OF TRUTH
 * ============================================================
 * Update this file to change any content on the website.
 * No other files need to be edited for content changes.
 * ============================================================
 */

// ── Personal Info ────────────────────────────────────────────
export const PERSONAL = {
  name: "Lipsita Samal",
  firstName: "Lipsita",
  lastName: "Samal",
  initials: "LS",
  title: "Full-Stack Developer & AI Enthusiast",
  subtitle:
    "Building modern web applications, solving complex problems with Java and React, and creating impactful AI-powered solutions.",
  location: "Bhubaneswar, Odisha, India",
  phone: "+91 7008004522",
  availability: "Open to Internship Opportunities",
  bio: "Motivated CSE undergraduate with hands-on experience in full-stack web development, AI data analytics, and DSA. I build things that matter — from AI trading bots to complete campus management platforms.",
  email: "lipsitasamal3@gmail.com",
  /** Replace /public/avatar.jpg to update profile image */
  avatar: "/avatar.jpg",
  /** Replace /public/resume.pdf to update resume */
  resumePath: "/resume.pdf",
} as const;

// ── Social Links ─────────────────────────────────────────────
export const SOCIAL_LINKS = {
  github: "https://github.com/lipsitasamal3-alt",
  linkedin: "https://in.linkedin.com/in/lipsita-samal-900303357",
  leetcode: "https://leetcode.com/u/Lipsitasamal/",
  email: PERSONAL.email,
} as const;

// ── GitHub Integration ────────────────────────────────────────
export const GITHUB_CONFIG = {
  /** Change this to update all GitHub API calls */
  username: "lipsitasamal3-alt",
  displayUrl: "github.com/lipsitasamal3-alt",
  reposToShow: 6,
} as const;

// ── LeetCode Config ───────────────────────────────────────────
export const LEETCODE_CONFIG = {
  /** Change this to update the LeetCode stats card */
  username: "Lipsitasamal",
  profileUrl: "https://leetcode.com/u/Lipsitasamal/",
  /** Primary language used for problem solving */
  language: "Java",
} as const;

// ── EmailJS Config ────────────────────────────────────────────
// Sign up at https://emailjs.com, create a service + template,
// then replace the placeholders below.
export const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
} as const;

// ── Navigation ───────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
] as const;

// ── Projects ─────────────────────────────────────────────────
export type ProjectCategory = "frontend" | "backend" | "ai" | "fullstack";

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Bullet-point feature highlights shown on the card */
  features: string[];
  tags: string[];
  github?: string;
  live?: string;
  category: ProjectCategory;
  emoji: string;
  date: string;
}

export const PROJECTS: Project[] = [
  {
    id: "campusos",
    title: "CampusOS",
    description:
      "A secure, full-stack student management platform that streamlines campus life with role-based access control and JWT authentication.",
    features: [
      "Role-based JWT authentication (Admin / Faculty / Student)",
      "Automated attendance tracking system",
      "SGPA & CGPA prediction engine",
      "Resource sharing & announcements hub",
      "Student collaboration module",
      "CI/CD deployment via GitHub → Vercel",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "Vercel"],
    github: "https://github.com/lipsitasamal3-alt/CamousOS",
    live: "https://camous-os.vercel.app",
    category: "fullstack",
    emoji: "🎓",
    date: "2026",
  },
  {
    id: "trading-bot",
    title: "AI Trading Bot",
    description:
      "An automated cryptocurrency trading bot that executes predefined technical analysis strategies against the Binance Futures Testnet with real-time market data.",
    features: [
      "Binance Futures Testnet API integration",
      "Real-time market data feed streams",
      "Predefined technical analysis strategies",
      "Programmatic order execution simulation",
      "Rigorous risk management framework",
      "Detailed transaction logging & performance monitoring",
    ],
    tags: ["Python", "Binance API", "Pandas", "Technical Analysis", "Algorithmic Trading"],
    github: "https://github.com/lipsitasamal3-alt/Trading_Bot",
    category: "ai",
    emoji: "🤖",
    date: "2026",
  },
];

// ── Skills ───────────────────────────────────────────────────
export interface Skill {
  name: string;
  emoji: string;
}

export interface SkillCategory {
  category: string;
  color: string;
  glow: string;
  iconName: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.2)",
    iconName: "Code2",
    skills: [
      { name: "Java", emoji: "☕" },
      { name: "JavaScript (ES6+)", emoji: "🟡" },
      { name: "TypeScript", emoji: "🔷" },
      { name: "Python", emoji: "🐍" },
      { name: "SQL", emoji: "🗃️" },
      { name: "HTML5", emoji: "🌐" },
      { name: "CSS3", emoji: "🎨" },
    ],
  },
  {
    category: "Frontend",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.2)",
    iconName: "Monitor",
    skills: [
      { name: "React.js", emoji: "⚛️" },
      { name: "Next.js", emoji: "▲" },
      { name: "Tailwind CSS", emoji: "💨" },
      { name: "Responsive Design", emoji: "📱" },
      { name: "DOM Manipulation", emoji: "🔧" },
      { name: "Web Storage APIs", emoji: "💾" },
    ],
  },
  {
    category: "Backend",
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.2)",
    iconName: "Server",
    skills: [
      { name: "Node.js", emoji: "🟢" },
      { name: "Express.js", emoji: "⚡" },
      { name: "REST APIs", emoji: "🔗" },
      { name: "JWT Auth", emoji: "🔐" },
    ],
  },
  {
    category: "Database",
    color: "#10B981",
    glow: "rgba(16,185,129,0.2)",
    iconName: "Database",
    skills: [
      { name: "MongoDB", emoji: "🍃" },
      { name: "MySQL", emoji: "🐬" },
      { name: "PostgreSQL", emoji: "🐘" },
    ],
  },
  {
    category: "Tools & Platforms",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.2)",
    iconName: "Wrench",
    skills: [
      { name: "Git", emoji: "🔀" },
      { name: "GitHub", emoji: "🐙" },
      { name: "Vercel", emoji: "▲" },
      { name: "VS Code", emoji: "💻" },
      { name: "Postman", emoji: "📬" },
    ],
  },
  {
    category: "Concepts",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.2)",
    iconName: "Lightbulb",
    skills: [
      { name: "DSA", emoji: "🧩" },
      { name: "OOP", emoji: "🏗️" },
      { name: "AI / ML", emoji: "🤖" },
      { name: "Data Analytics", emoji: "📊" },
      { name: "CI/CD", emoji: "🔄" },
    ],
  },
];

// ── Work Experience / Timeline ────────────────────────────────
export interface TimelineItem {
  year: string;
  title: string;
  organization?: string;
  description: string;
  tags?: string[];
  emoji: string;
  type?: "work" | "project" | "education" | "achievement";
}

export const TIMELINE: TimelineItem[] = [
  {
    year: "2025",
    title: "Started B.Tech CSE at ITER SOA University",
    organization: "ITER, Siksha 'O' Anusandhan University",
    description:
      "Began my Computer Science Engineering journey — diving deep into data structures, algorithms, OOP, and software development fundamentals.",
    tags: ["University", "CSE", "Algorithms"],
    emoji: "🎓",
    type: "education",
  },
  {
    year: "2026",
    title: "Launched CampusOS",
    organization: "Personal Project",
    description:
      "Built and deployed CampusOS — a secure full-stack student management platform with JWT auth, role-based access control, attendance tracking, SGPA/CGPA prediction, and CI/CD to Vercel.",
    tags: ["React.js", "Node.js", "MongoDB", "JWT", "Vercel"],
    emoji: "🚀",
    type: "project",
  },
  {
    year: "2026",
    title: "Built AI Trading Bot",
    organization: "Personal Project",
    description:
      "Developed an automated cryptocurrency trading bot using Binance Futures Testnet API with real-time market data feeds, technical analysis strategies, and risk management.",
    tags: ["Python", "Binance API", "Pandas"],
    emoji: "🤖",
    type: "project",
  },
  {
    year: "Jun – Jul 2026",
    title: "AI Data Analytics Intern",
    organization: "InAmigos Foundation",
    description:
      "Completed a specialized professional training internship focused on AI Data Analytics. Processed structural datasets, interpreted trends, integrated predictive methodologies, and enhanced data visualization efficiency.",
    tags: ["AI", "Data Analytics", "Python", "Visualization"],
    emoji: "📊",
    type: "work",
  },
];

// ── Certificates ─────────────────────────────────────────────
export type CertificateStatus = "earned" | "upcoming";

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  emoji: string;
  color: string;
  status: CertificateStatus;
  link?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    title: "Deloitte Cyber Job Simulation",
    issuer: "Deloitte / Forage",
    date: "June 2026",
    emoji: "🛡️",
    color: "#3B82F6",
    status: "earned",
  },
];

// ── Education ─────────────────────────────────────────────────
export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  location: string;
  status: "active" | "completed";
  description: string;
  subjects: string[];
}

export const EDUCATION: Education = {
  institution: "ITER, Siksha 'O' Anusandhan University",
  degree: "B.Tech",
  field: "Computer Science & Engineering",
  startYear: "2025",
  endYear: "2029",
  location: "Bhubaneswar, Odisha, India",
  status: "active",
  description:
    "Building a strong foundation in Computer Science — covering Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Operating Systems, and Software Engineering principles. Complementing academics with real-world projects and open source contributions.",
  subjects: [
    "Data Structures & Algorithms",
    "OOP",
    "Database Systems",
    "Operating Systems",
    "Software Engineering",
    "Computer Networks",
    "Web Development",
  ],
};

/** Prior education milestones */
export const PRIOR_EDUCATION = [
  {
    label: "Class XII — Higher Secondary",
    school: "Narayana Group of Schools",
    score: "81.0%",
    emoji: "📚",
  },
  {
    label: "Class X — Secondary",
    school: "Freedom International School",
    score: "90.2%",
    emoji: "🎖️",
  },
] as const;

// ── About — Quick Stats ───────────────────────────────────────
export const ABOUT_STATS = [
  { label: "Year Started",   value: "2025", iconName: "BookOpen",      color: "#3B82F6" },
  { label: "Projects Built", value: "2+",   iconName: "Rocket",        color: "#8B5CF6" },
  { label: "Certifications", value: "1",    iconName: "GraduationCap", color: "#06B6D4" },
  { label: "Internships",    value: "1",    iconName: "Briefcase",     color: "#10B981" },
] as const;

export const ABOUT_PASSIONS = [
  { label: "Java",            emoji: "☕" },
  { label: "React.js",        emoji: "⚛️" },
  { label: "AI / ML",         emoji: "🤖" },
  { label: "Data Analytics",  emoji: "📊" },
  { label: "Problem Solving", emoji: "🧩" },
  { label: "Open Source",     emoji: "🌱" },
] as const;

// ── Achievements ──────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    title: "Miss Xavier Award",
    description:
      "Conferred for excellence in cross-functional team leadership and professional presentation delivery.",
    emoji: "🏅",
  },
  {
    title: "NSS Active Member",
    description:
      "Devoted systematic hours to university public-welfare campaigns and community social outreach.",
    emoji: "🤝",
  },
] as const;

// ── Languages ─────────────────────────────────────────────────
export const SPOKEN_LANGUAGES = [
  { language: "English", level: "Fluent / Professional",  emoji: "🇬🇧" },
  { language: "Odia",    level: "Native / Bilingual",     emoji: "🇮🇳" },
  { language: "Hindi",   level: "Conversational",         emoji: "🇮🇳" },
] as const;

// ── Core Competencies ─────────────────────────────────────────
export const COMPETENCIES = [
  "Full-Stack Web Development & REST APIs",
  "Problem Solving & Data Structures (DSA)",
  "Database Design & Version Control (Git)",
  "AI Data Analytics & Predictive Modelling",
  "Team Collaboration & Rapid Learning",
] as const;
