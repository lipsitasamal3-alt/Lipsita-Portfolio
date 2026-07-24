"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2, Clock } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { CERTIFICATES } from "@/data/portfolio";

export default function Certificates() {
  return (
    <section id="certificates" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Certifications"
          title="Professional"
          highlight=" Certificates"
          description="Credentials that validate my skills and commitment to continuous learning."
          className="mb-12"
        />

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
          role="list"
          aria-label="Certificates and certifications"
        >
          {CERTIFICATES.map((cert, i) => (
            <motion.li
              key={cert.title}
              role="listitem"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 340, damping: 24 }}
                className={`glass-card p-6 h-full flex flex-col relative overflow-hidden ${
                  cert.status === "upcoming" ? "opacity-70 hover:opacity-100" : ""
                }`}
                aria-label={`${cert.title} by ${cert.issuer} — ${cert.status === "earned" ? "Earned" : "Upcoming"}`}
              >
                {/* Color accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Status icon */}
                <div className="absolute top-4 right-4" aria-hidden="true">
                  {cert.status === "earned" ? (
                    <CheckCircle2 className="w-4 h-4" style={{ color: cert.color }} />
                  ) : (
                    <Clock className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </div>

                {/* Emoji icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{
                    backgroundColor: `${cert.color}12`,
                    border: `1px solid ${cert.color}22`,
                  }}
                  aria-hidden="true"
                >
                  {cert.emoji}
                </div>

                <h3 className="font-bold text-white text-sm mb-1 leading-snug pr-6">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mb-1">{cert.issuer}</p>
                <p className="text-xs font-semibold mb-4" style={{ color: cert.color }}>
                  {cert.status === "earned" ? cert.date : `Coming ${cert.date}`}
                </p>

                {cert.status === "upcoming" ? (
                  <div className="mt-auto py-2 px-3 rounded-xl border border-dashed border-white/10 text-center text-xs text-[#94A3B8]">
                    In Progress
                  </div>
                ) : (
                  <div
                    className="mt-auto flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: cert.color }}
                  >
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    Certified
                  </div>
                )}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
