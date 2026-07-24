"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  /** Text before the highlighted word */
  title: string;
  /** Word(s) to render with gradient — must be an exact substring of the full heading text */
  highlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <header className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-4"
          aria-hidden="true"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
      >
        {/* Full visible title includes both `title` and `highlight` */}
        {title}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className={cn(
            "text-[#94A3B8] text-base sm:text-lg max-w-xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
