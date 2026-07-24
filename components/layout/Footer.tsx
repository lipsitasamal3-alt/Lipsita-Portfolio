"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Code2 } from "lucide-react";
import { PERSONAL, SOCIAL_LINKS } from "@/data/portfolio";

const SOCIAL = [
  { Icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
  { Icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { Icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: "Send email" },
] as const;

const STACK = ["Next.js", "TypeScript", "Tailwind", "Framer Motion"];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12" role="contentinfo">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="container-max relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                {PERSONAL.initials}
              </div>
              <span className="font-semibold text-white">{PERSONAL.name}</span>
            </div>

            <p className="text-[#94A3B8] text-sm">
              Designed &amp; Developed with{" "}
              <span className="text-red-400" aria-label="love">♥</span>{" "}
              by {PERSONAL.firstName}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <Code2 className="w-3 h-3 text-blue-400" aria-hidden="true" />
              <span>Built with {STACK.join(" · ")}</span>
            </div>
          </div>

          {/* Social + Back to top */}
          <div className="flex items-center gap-2.5">
            {SOCIAL.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#94A3B8] hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            ))}

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="ml-1 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_24px_rgba(59,130,246,0.5)] transition-shadow"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#94A3B8]">
          <span>© {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.</span>
          <span>
            Open to opportunities ·{" "}
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-blue-400 hover:underline focus-visible:underline"
            >
              Let&apos;s connect
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
