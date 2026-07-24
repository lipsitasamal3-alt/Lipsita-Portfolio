"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const progress = useScrollProgress();
  const scaleX = useSpring(progress / 100, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, width: "100%" }}
    />
  );
}
