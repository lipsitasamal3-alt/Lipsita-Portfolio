"use client";

import { useEffect, useCallback, useState, useRef, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Code2, User, Briefcase, Github, Mail, Award, BookOpen, Home, ExternalLink } from "lucide-react";
import { PERSONAL, SOCIAL_LINKS } from "@/data/portfolio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  id: string;
  label: string;
  icon: ElementType;
  href: string;
  external?: boolean;
  shortcut?: string;
}

const COMMANDS: Command[] = [
  { id: "home",         label: "Home",                icon: Home,        href: "#",                    shortcut: "H" },
  { id: "about",        label: "About Me",            icon: User,        href: "#about",               shortcut: "A" },
  { id: "skills",       label: "Skills",              icon: Code2,       href: "#skills",              shortcut: "S" },
  { id: "projects",     label: "Projects",            icon: Briefcase,   href: "#projects",            shortcut: "P" },
  { id: "github",       label: "GitHub Stats",        icon: Github,      href: "#github",              shortcut: "G" },
  { id: "certs",        label: "Certificates",        icon: Award,       href: "#certificates",        shortcut: "C" },
  { id: "education",    label: "Education",           icon: BookOpen,    href: "#education",           shortcut: "E" },
  { id: "contact",      label: "Contact Me",          icon: Mail,        href: "#contact",             shortcut: "M" },
  { id: "gh-profile",   label: "Open GitHub",         icon: ExternalLink, href: SOCIAL_LINKS.github,  external: true },
  { id: "linkedin",     label: "Open LinkedIn",       icon: ExternalLink, href: SOCIAL_LINKS.linkedin, external: true },
  { id: "resume",       label: "Download Resume",     icon: BookOpen,    href: PERSONAL.resumePath,   external: true },
];

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const filtered = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (cmd: Command) => {
      if (cmd.external) {
        window.open(cmd.href, "_blank", "noopener,noreferrer");
      } else {
        const el = document.querySelector(cmd.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      onClose();
      setQuery("");
    },
    [onClose]
  );

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          if (filtered[selectedIndex]) handleSelect(filtered[selectedIndex]);
          break;
        case "Tab": {
          // Focus trap — keep focus inside modal
          e.preventDefault();
          const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, input, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) last.focus();
          } else {
            if (document.activeElement === last) first.focus();
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, handleSelect, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="command-palette-overlay"
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette — navigate the portfolio"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="command-palette-modal mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search bar */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <Search className="w-4 h-4 text-[#94A3B8] flex-shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                aria-label="Search commands"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent text-white placeholder:text-[#94A3B8] text-sm outline-none"
              />
              <button
                onClick={onClose}
                aria-label="Close command palette"
                className="text-[#94A3B8] hover:text-white transition-colors p-1 rounded"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="max-h-72 overflow-y-auto py-1.5"
            >
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-[#94A3B8] text-sm">
                  No results for &quot;{query}&quot;
                </p>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  const isSelected = i === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-blue-500/10 text-white"
                          : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-blue-400" : ""}`}
                        aria-hidden="true"
                      />
                      <span className="flex-1 font-medium">{cmd.label}</span>
                      {cmd.shortcut && (
                        <kbd className="text-xs bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 text-[#94A3B8] font-mono">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2.5 border-t border-white/10 flex items-center gap-4 text-xs text-[#94A3B8]">
              {[
                { key: "↑↓", label: "Navigate" },
                { key: "↵", label: "Select" },
                { key: "Esc", label: "Close" },
              ].map(({ key, label }) => (
                <span key={label} className="flex items-center gap-1">
                  <kbd className="bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 font-mono">
                    {key}
                  </kbd>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
