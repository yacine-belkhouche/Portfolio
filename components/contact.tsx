"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Reveal, Spotlight, WordsUp } from "./motion-primitives";
import { site } from "@/lib/site";

const services = [
  "Business Management System",
  "High-Performance Web Development",
  "Technical SEO",
  "Not sure yet? Let's talk",
];

const budgets = ["Under $1k", "$1k – $3k", "$3k – $8k", "$8k+", "Retainer"];

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked; the link still works */
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (json.errors) setErrors(json.errors);
      setStatus("error");
      setMessage(
        json.error ??
          "Please check the highlighted fields and try again."
      );
    } catch {
      setStatus("error");
      setMessage(
        "Network error. Email me directly at " + site.email + " and I'll pick it up there."
      );
    }
  }

  const field =
    "w-full rounded-lg border border-hairline bg-canvas px-4 py-3 text-[15px] text-fg placeholder:text-muted/70 outline-none transition-all duration-500 focus:border-gold/50 focus:bg-surface focus:ring-1 focus:ring-gold/20";
  const label = "block text-[11px] uppercase tracking-[0.18em] text-muted";

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 lg:py-36">
      <div
        className="glow left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 bg-gold-soft/[0.18]"
        aria-hidden
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-muted">
              <span className="h-px w-10 bg-hairline" />
              <span className="text-gold">04</span>
              Contact
              <span className="h-px w-10 bg-hairline" />
            </p>
          </Reveal>
          <h2 className="mt-7 font-display text-4xl leading-[1.08] tracking-[-0.02em] text-fg sm:text-5xl lg:text-[3.75rem]">
            <WordsUp text="Tell me what your business" />
            <span className="mt-2 block italic gold-wash">
              <WordsUp text="is losing time on." delay={0.25} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.8] text-muted">
              Send a few lines about the problem  not a spec. I&apos;ll reply
              within 24 hours with an honest read on whether I&apos;m the right
              person, a rough scope, and a number. No pitch deck, no discovery
              retainer.
            </p>
          </Reveal>
        </div>

        {/* Direct lines: phone & email, front and centre */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
          {[
            {
              key: "phone",
              eyebrow: "Call or WhatsApp",
              value: site.phoneDisplay,
              sub: site.phoneIntl,
              href: site.phoneHref,
              copyValue: site.phoneDisplay,
              icon: "M6.6 3h-2A1.6 1.6 0 0 0 3 4.7 15.3 15.3 0 0 0 19.3 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.6 1.6 0 0 0-1.4-1.6 9.6 9.6 0 0 1-2.1-.5 1.6 1.6 0 0 0-1.7.4l-.9.9a12.6 12.6 0 0 1-5.5-5.5l.9-.9a1.6 1.6 0 0 0 .4-1.7 9.6 9.6 0 0 1-.5-2.1A1.6 1.6 0 0 0 8.6 5",
            },
            {
              key: "email",
              eyebrow: "Email",
              value: site.email,
              sub: "Replies within 24 hours",
              href: "mailto:" + site.email,
              copyValue: site.email,
              icon: "M3.5 6.5h17v11h-17zM3.9 7l8.1 6 8.1-6",
            },
          ].map((c, i) => (
            <Reveal key={c.key} delay={i * 0.08}>
              <Spotlight className="edge-lit h-full rounded-2xl border border-hairline bg-surface transition-colors duration-700 hover:border-gold/25">
                <div className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline text-gold">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden
                      >
                        <path d={c.icon} />
                      </svg>
                    </span>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                      {c.eyebrow}
                    </p>
                  </div>

                  <a
                    href={c.href}
                    className="mt-5 block font-display text-2xl text-fg [overflow-wrap:anywhere] transition-colors duration-500 hover:text-gold sm:text-[1.7rem]"
                  >
                    {c.key === "email" ? (
                      <>
                        {c.value.split("@")[0]}
                        <wbr />@{c.value.split("@")[1]}
                      </>
                    ) : (
                      c.value
                    )}
                  </a>
                  <p className="mt-1.5 text-[12px] text-muted">{c.sub}</p>

                  <button
                    type="button"
                    onClick={() => copy(c.copyValue, c.key)}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-hairline px-3.5 py-1.5 text-[11px] tracking-wide text-muted transition-colors duration-500 hover:border-gold/35 hover:text-fg"
                  >
                    {copied === c.key ? "Copied" : "Copy"}
                    <span aria-hidden>{copied === c.key ? "✓" : "⧉"}</span>
                  </button>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        {/* Enquiry form */}
        <Reveal delay={0.1} y={36}>
          <div className="relative mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border border-hairline bg-surface p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center py-14 text-center"
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-2xl text-gold"
                  >
                    ✓
                  </motion.span>
                  <h3 className="mt-6 font-display text-3xl text-fg">
                    Message received.
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                    It&apos;s in my inbox and I&apos;ll come back to you within
                    24 hours. If it&apos;s urgent, call{" "}
                    <a
                      href={site.phoneHref}
                      className="text-gold hover:underline"
                    >
                      {site.phoneDisplay}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-[13px] text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-5 sm:grid-cols-2"
                  noValidate
                >
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="space-y-2">
                    <label className={label} htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      className={field}
                    />
                    {errors.name && (
                      <p className="text-[12px] text-red-700">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={label} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={field}
                    />
                    {errors.email && (
                      <p className="text-[12px] text-red-700">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={label} htmlFor="company">
                      Company <span className="normal-case">(optional)</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      placeholder="Where you work"
                      className={field}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={label} htmlFor="budget">
                      Budget range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      className={field + " appearance-none"}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-surface text-fg">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className={label} htmlFor="service">
                      What do you need?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s, i) => (
                        <label
                          key={s}
                          className="cursor-pointer rounded-full border border-hairline px-4 py-2 text-[12px] text-muted transition-all duration-400 has-[:checked]:border-gold/50 has-[:checked]:bg-gold/[0.08] has-[:checked]:text-fg hover:border-hairline-strong hover:text-fg"
                        >
                          <input
                            type="radio"
                            name="service"
                            value={s}
                            defaultChecked={i === 0}
                            className="sr-only"
                          />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className={label} htmlFor="message">
                      The problem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="What's slow, manual, or invisible in search right now?"
                      className={field + " resize-none"}
                    />
                    {errors.message && (
                      <p className="text-[12px] text-red-700">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[12px] leading-relaxed text-muted">
                      Stored securely in Supabase. Never shared, never used for
                      marketing.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-fg px-7 py-3.5 text-sm font-medium text-canvas transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="relative z-10">
                        {status === "sending" ? "Sending…" : "Send enquiry"}
                      </span>
                      <svg
                        className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M1 8h13M9 3l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="absolute inset-0 z-0 translate-y-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                    </button>
                  </div>

                  {status === "error" && message && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-red-600/25 bg-red-600/[0.06] px-4 py-3 text-[13px] text-red-800 sm:col-span-2"
                    >
                      {message}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
