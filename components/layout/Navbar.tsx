"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Download } from "lucide-react";
import { NAV_ITEMS, PERSONAL } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import ScrollProgress from "@/components/shared/ScrollProgress";
import CommandPalette from "@/components/shared/CommandPalette";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const mobileMenuId = "mobile-nav-menu";

  const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

  const openPalette = useCallback(() => setIsPaletteOpen(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPalette]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      (el as HTMLElement).focus({ preventScroll: true });
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ScrollProgress />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#"
              aria-label={`${PERSONAL.name} — back to top`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_16px_rgba(59,130,246,0.35)] hover:shadow-[0_0_24px_rgba(59,130,246,0.55)] transition-shadow">
                {PERSONAL.initials}
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <nav aria-label="Page sections" className="hidden md:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive ? "text-white" : "text-[#94A3B8] hover:text-white"
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* ⌘K hint */}
              <motion.button
                onClick={openPalette}
                aria-label="Open command palette (Ctrl+K)"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-[#94A3B8] text-xs hover:text-white hover:border-white/20 transition-all"
              >
                <Command className="w-3 h-3" aria-hidden="true" />
                <span>K</span>
              </motion.button>

              {/* Resume download */}
              <motion.a
                href={PERSONAL.resumePath}
                download
                aria-label="Download resume PDF"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_24px_rgba(59,130,246,0.5)] transition-shadow"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                Resume
              </motion.a>

              {/* Mobile toggle */}
              <motion.button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileOpen}
                aria-controls={mobileMenuId}
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {isMobileOpen
                  ? <X className="w-5 h-5" aria-hidden="true" />
                  : <Menu className="w-5 h-5" aria-hidden="true" />
                }
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              id={mobileMenuId}
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="md:hidden overflow-hidden glass border-t border-white/[0.06]"
            >
              <div className="container-max py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 }}
                      onClick={() => handleNavClick(item.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}

                <a
                  href={PERSONAL.resumePath}
                  download
                  className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  );
}
