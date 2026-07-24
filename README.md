# Lipsita Samal — Developer Portfolio

A world-class, premium, recruiter-focused personal portfolio website.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat-square&logo=vercel)](https://lipsita-portfolio.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)

---

## ✨ Features

- **Glassmorphism UI** — premium dark theme with subtle gradients and frosted glass cards
- **Framer Motion** — smooth, purposeful animations throughout
- **Command Palette** — `Ctrl+K` / `Cmd+K` to jump anywhere on the page
- **GitHub Integration** — live stats and repository cards via GitHub API
- **LeetCode Stats** — animated progress rings and difficulty breakdown
- **Contact Form** — EmailJS with full client-side validation and accessible error states
- **Scroll Progress Bar** — thin gradient progress indicator
- **Keyboard Accessibility** — full ARIA labels, focus management, skip-to-content
- **SEO Optimized** — JSON-LD schema, Open Graph, Twitter Card, sitemap.xml
- **Lighthouse 95+** — optimised images, removed motion for `prefers-reduced-motion`

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 + custom CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Type animation | react-type-animation |
| Contact | EmailJS |
| Deploy | Vercel |

## 📁 Project Structure

```
├── app/
│   ├── globals.css        # Design tokens, glass morphism, utilities
│   ├── layout.tsx         # Root layout with SEO metadata + JSON-LD
│   ├── page.tsx           # Main page assembler
│   ├── manifest.ts        # PWA manifest (App Router)
│   └── sitemap.ts         # Auto-generated sitemap
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Sticky nav with ⌘K, mobile drawer, active section
│   │   └── Footer.tsx     # Social links, back-to-top
│   ├── sections/          # One file per page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── GitHub.tsx
│   │   ├── LeetCode.tsx
│   │   ├── Certificates.tsx
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   └── shared/
│       ├── CommandPalette.tsx
│       ├── GlassCard.tsx
│       ├── LoadingScreen.tsx
│       ├── ScrollProgress.tsx
│       └── SectionHeader.tsx
│
├── data/
│   └── portfolio.ts       # ⭐ SINGLE SOURCE OF TRUTH — edit this to update the site
│
├── hooks/
│   ├── useActiveSection.ts
│   ├── useGitHub.ts
│   └── useScrollProgress.ts
│
├── lib/
│   ├── constants.ts       # Re-exports from data/portfolio.ts (backward compat)
│   └── utils.ts           # cn(), isValidEmail(), formatNumber(), etc.
│
├── public/
│   ├── resume.pdf         # ← Replace this file to update resume
│   ├── avatar.jpg         # ← Replace this file to update profile photo
│   ├── og-image.png       # Open Graph social preview
│   └── robots.txt
│
└── types/
    └── index.ts           # Shared TypeScript types
```

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/lipsitasamal3-alt/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📝 Updating Content

**All content lives in one file:** [`data/portfolio.ts`](./data/portfolio.ts)

| What to update | Where |
|----------------|-------|
| Name, bio, title | `PERSONAL` object |
| Social links | `SOCIAL_LINKS` object |
| GitHub username | `GITHUB_CONFIG.username` |
| LeetCode username | `LEETCODE_CONFIG.username` |
| Projects | `PROJECTS` array |
| Skills | `SKILL_CATEGORIES` array |
| Experience timeline | `TIMELINE` array |
| Certificates | `CERTIFICATES` array |
| Education | `EDUCATION` object |
| EmailJS keys | `EMAILJS_CONFIG` object |
| Resume | Replace `public/resume.pdf` |

## 📧 Email Setup (Contact Form)

1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a service and template
3. Update `EMAILJS_CONFIG` in `data/portfolio.ts`:
```ts
export const EMAILJS_CONFIG = {
  serviceId:  "service_xxxxxxx",
  templateId: "template_xxxxxxx",
  publicKey:  "your_public_key",
};
```

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. No environment variables needed — EmailJS keys are in source

---

Made with ❤️ by [Lipsita Samal](https://lipsita-portfolio.vercel.app)
