"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Enable 3-D tilt on hover (use sparingly — only for single-card focal points) */
  tilt?: boolean;
  /** Hex/rgba glow color for hover box-shadow */
  glow?: string;
  onClick?: () => void;
  /** Forwarded to the underlying div for accessibility */
  role?: string;
  "aria-label"?: string;
}

export default function GlassCard({
  children,
  className,
  tilt = false,
  glow,
  onClick,
  ...rest
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values are always created — but only applied when tilt=true
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-100, 100], [6, -6]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [-100, 100], [-6, 6]), { stiffness: 280, damping: 28 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    mx.set(0);
    my.set(0);
  };

  const tiltStyle = tilt
    ? { rotateX, rotateY, transformStyle: "preserve-3d" as const }
    : {};

  // Glow is applied via whileHover — no conflict with CSS .glass-card hover
  const hoverProps = glow
    ? { boxShadow: `0 16px 48px rgba(0,0,0,0.55), 0 0 28px ${glow}` }
    : {};

  return (
    <motion.div
      ref={cardRef}
      className={cn("glass-card relative", className)}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={Object.keys(hoverProps).length > 0 ? hoverProps : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
