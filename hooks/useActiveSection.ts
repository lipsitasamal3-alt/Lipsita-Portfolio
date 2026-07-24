"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useActiveSection
 *
 * Uses a single IntersectionObserver for all sections.
 * Picks the section closest to the top-center of the viewport
 * to avoid jumpy behaviour when multiple sections are intersecting.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState("");
  // Cache element refs so we avoid repeated querySelector calls
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    // Populate element cache once ids are known
    elementsRef.current.clear();
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) elementsRef.current.set(id, el);
    });

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            intersecting.add(id);
          } else {
            intersecting.delete(id);
          }
        });

        if (intersecting.size === 0) return;

        // Among all visible sections, pick the one whose top is nearest
        // to the center of the viewport (prevents jumpy transitions)
        const viewportMid = window.innerHeight / 2;
        let best = "";
        let bestDist = Infinity;

        intersecting.forEach((id) => {
          const el = elementsRef.current.get(id);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - viewportMid);
          if (dist < bestDist) {
            bestDist = dist;
            best = id;
          }
        });

        if (best) setActiveSection(best);
      },
      // Wide rootMargin so sections are "intersecting" while visible
      { rootMargin: "-10% 0px -10% 0px", threshold: 0 }
    );

    elementsRef.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  return activeSection;
}
