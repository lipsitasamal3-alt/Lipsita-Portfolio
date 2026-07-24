"use client";

import { useState, useRef, useId, type FormEvent, type ChangeEvent, type FocusEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, MapPin, MessageSquare,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { PERSONAL, SOCIAL_LINKS, EMAILJS_CONFIG, GITHUB_CONFIG } from "@/data/portfolio";
import { isValidEmail } from "@/lib/utils";
import type { FormStatus, ContactFormData, FormErrors } from "@/types";

// ── Derived social links for the sidebar ──────────────────────
const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: SOCIAL_LINKS.email,
    href: `mailto:${SOCIAL_LINKS.email}`,
    color: "#3B82F6",
  },
  {
    icon: Github,
    label: "GitHub",
    value: GITHUB_CONFIG.displayUrl,
    href: SOCIAL_LINKS.github,
    color: "#8B5CF6",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: SOCIAL_LINKS.linkedin.split("/").filter(Boolean).pop() ?? "lipsita-samal",
    href: SOCIAL_LINKS.linkedin,
    color: "#06B6D4",
  },
] as const;

// ── Validation ─────────────────────────────────────────────────
function validate(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.from_name.trim()) {
    errors.from_name = "Your name is required.";
  } else if (data.from_name.trim().length < 2) {
    errors.from_name = "Name must be at least 2 characters.";
  }
  if (!data.from_email.trim()) {
    errors.from_email = "Email address is required.";
  } else if (!isValidEmail(data.from_email)) {
    errors.from_email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

const INITIAL_DATA: ContactFormData = { from_name: "", from_email: "", message: "" };

// ── Component ───────────────────────────────────────────────────
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  // Stable IDs for label/input association
  const nameId    = useId();
  const emailId   = useId();
  const messageId = useId();
  const nameErrId = `${nameId}-error`;
  const emailErrId = `${emailId}-error`;
  const msgErrId  = `${messageId}-error`;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    // Re-validate touched fields on change
    if (touched[name as keyof ContactFormData]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mark all fields as touched and validate
    setTouched({ from_name: true, from_email: true, message: true });
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!formRef.current) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );
      setStatus("success");
      setFormData(INITIAL_DATA);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
      // Keep error visible until next interaction
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrors({});
    setTouched({});
    setFormData(INITIAL_DATA);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Work"
          highlight=" Together"
          description="Have a project in mind or want to connect? I'd love to hear from you."
          className="mb-12"
        />

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* ── Left sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Intro */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-white">Get in Touch</h3>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Whether you&apos;re looking for an intern, want to collaborate on a project, or just
                want to say hi — my inbox is always open.
              </p>
              <p className="flex items-center gap-1.5 mt-4 text-xs text-[#94A3B8]">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                {PERSONAL.location}
              </p>
            </GlassCard>

            {/* Social links */}
            {CONTACT_LINKS.map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                aria-label={`${label}: ${value}`}
                whileHover={{ x: 4, y: -2 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}12`, border: `1px solid ${color}22` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-[#94A3B8]">{label}</p>
                  <p className="text-sm font-medium text-white truncate">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <GlassCard className="p-8 relative overflow-hidden">
              {/* Accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                {/* ── Success state ── */}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    className="py-14 flex flex-col items-center gap-4 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-400" aria-hidden="true" />
                    </motion.div>
                    <h4 className="font-bold text-white text-xl">Message Sent!</h4>
                    <p className="text-[#94A3B8] text-sm max-w-xs leading-relaxed">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <motion.button
                      onClick={handleReset}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-2 px-5 py-2 rounded-full border border-white/15 text-sm text-[#94A3B8] hover:text-white hover:border-white/25 transition-all"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                )}

                {/* ── Form state ── */}
                {status !== "success" && (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="font-bold text-white text-lg mb-6">Send a Message</h3>

                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                      aria-label="Contact form"
                    >
                      {/* Name + Email row */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor={nameId}
                            className="block text-sm text-[#94A3B8] font-medium"
                          >
                            Your Name <span aria-hidden="true">*</span>
                            <span className="sr-only">(required)</span>
                          </label>
                          <input
                            id={nameId}
                            type="text"
                            name="from_name"
                            value={formData.from_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Jane Doe"
                            autoComplete="name"
                            aria-required="true"
                            aria-invalid={touched.from_name && !!errors.from_name}
                            aria-describedby={errors.from_name ? nameErrId : undefined}
                            className="input-glass"
                          />
                          <AnimatePresence>
                            {touched.from_name && errors.from_name && (
                              <FieldError id={nameErrId} message={errors.from_name} />
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor={emailId}
                            className="block text-sm text-[#94A3B8] font-medium"
                          >
                            Email Address <span aria-hidden="true">*</span>
                            <span className="sr-only">(required)</span>
                          </label>
                          <input
                            id={emailId}
                            type="email"
                            name="from_email"
                            value={formData.from_email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="jane@example.com"
                            autoComplete="email"
                            aria-required="true"
                            aria-invalid={touched.from_email && !!errors.from_email}
                            aria-describedby={errors.from_email ? emailErrId : undefined}
                            className="input-glass"
                          />
                          <AnimatePresence>
                            {touched.from_email && errors.from_email && (
                              <FieldError id={emailErrId} message={errors.from_email} />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor={messageId}
                          className="block text-sm text-[#94A3B8] font-medium"
                        >
                          Message <span aria-hidden="true">*</span>
                          <span className="sr-only">(required, minimum 20 characters)</span>
                        </label>
                        <textarea
                          id={messageId}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={6}
                          placeholder={`Hi ${PERSONAL.firstName}, I'd love to discuss…`}
                          aria-required="true"
                          aria-invalid={touched.message && !!errors.message}
                          aria-describedby={
                            [
                              errors.message && touched.message ? msgErrId : "",
                              `${messageId}-count`,
                            ]
                              .filter(Boolean)
                              .join(" ") || undefined
                          }
                          className="input-glass"
                        />
                        <div className="flex items-start justify-between gap-2">
                          <AnimatePresence>
                            {touched.message && errors.message && (
                              <FieldError id={msgErrId} message={errors.message} />
                            )}
                          </AnimatePresence>
                          <span
                            id={`${messageId}-count`}
                            className={`text-xs ml-auto tabular-nums ${
                              formData.message.length < 20 && touched.message
                                ? "text-amber-400"
                                : "text-[#94A3B8]"
                            }`}
                            aria-live="polite"
                          >
                            {formData.message.length}/20 min
                          </span>
                        </div>
                      </div>

                      {/* Send error banner */}
                      <AnimatePresence>
                        {status === "error" && (
                          <motion.div
                            key="send-error"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            role="alert"
                            className="flex items-start gap-2.5 text-sm text-red-400 bg-red-500/8 border border-red-500/18 rounded-xl px-4 py-3"
                          >
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>
                              Failed to send. Please email me directly at{" "}
                              <a
                                href={`mailto:${SOCIAL_LINKS.email}`}
                                className="underline font-medium hover:text-red-300"
                              >
                                {SOCIAL_LINKS.email}
                              </a>
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={status !== "sending" ? { scale: 1.02, y: -1 } : {}}
                        whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                        className="w-full btn-primary disabled:opacity-55 disabled:cursor-not-allowed"
                        aria-busy={status === "sending"}
                      >
                        {status === "sending" ? (
                          <>
                            <span
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                              aria-hidden="true"
                            />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" aria-hidden="true" />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Field error message ────────────────────────────────────────
function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <motion.p
      id={id}
      role="alert"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.18 }}
      className="flex items-center gap-1.5 text-xs text-red-400 overflow-hidden"
    >
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
      {message}
    </motion.p>
  );
}
