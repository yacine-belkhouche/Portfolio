"use client";

import { motion } from "framer-motion";
import { Reveal, Spotlight } from "./motion-primitives";

const services = [
  {
    n: "01",
    title: "Business Management Systems",
    lede: "The software your operation should have had three years ago.",
    body: [
      "Spreadsheets four people edit at once. Orders tracked in a WhatsApp thread. A stock count that is only true on Sunday night. I replace the improvised layer your business is running on with one system built around how your team actually works: real-time data, role-based access, and an audit trail that answers “who changed this” in a single click.",
      "Underneath: a properly normalised PostgreSQL schema on Supabase, row-level security so a sales rep never sees payroll, and custom API integrations that make your payment gateway, accounting tool and delivery partner behave like one product instead of four.",
    ],
    tags: [
      "Supabase & PostgreSQL architecture",
      "Row-level security",
      "Custom API & webhook integrations",
      "Real-time dashboards",
      "Role-based admin panels",
      "Automated reporting",
    ],
    outcome: "Manual admin hours cut, not shuffled.",
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="7.5" ry="3.2" />
        <path d="M4.5 6v6c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2V6" />
        <path d="M4.5 12v6c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2v-6" />
      </>
    ),
  },
  {
    n: "02",
    title: "High-Performance Web Development",
    lede: "Every 100 milliseconds you shave is revenue you keep.",
    body: [
      "Visitors decide whether to trust a business before the page finishes painting. I build frontends in Next.js where the first meaningful pixel lands in under a second: server components and static rendering carrying the load, fonts and images negotiated ahead of time, JavaScript shipped only where it earns its place.",
      "The gain is measurable rather than aesthetic: green Core Web Vitals, lower bounce, longer sessions, and a site that still feels expensive on a mid-range phone over a 4G connection, which is where most of your customers actually are.",
    ],
    tags: [
      "Next.js RSC, SSR & ISR",
      "Core Web Vitals: LCP, INP, CLS",
      "Bundle & image optimisation",
      "Edge caching strategy",
      "Lighthouse 95+ builds",
      "WCAG-conscious accessibility",
    ],
    outcome: "Sub-second loads that hold under real traffic.",
    icon: (
      <>
        <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" />
      </>
    ),
  },
  {
    n: "03",
    title: "Technical SEO",
    lede: "Ranking is an architecture problem before it is a content problem.",
    body: [
      "Most sites lose search before a single word is written. A crawler arrives to find duplicated URLs, a heading order nothing can parse, and content that only exists once the JavaScript has run. I build it the other way round: semantic HTML, server-rendered content, a deliberate canonical and internal-link structure, Schema.org markup, and sitemaps that stay accurate as the site grows.",
      "That work compounds. Organic traffic costs nothing per click and keeps arriving long after a campaign budget has been spent, which makes the structure underneath your site one of the few assets that appreciates.",
    ],
    tags: [
      "Server-rendered, crawlable content",
      "Schema.org / JSON-LD",
      "Canonicals & internal linking",
      "Sitemaps, robots & indexation",
      "Speed as a ranking signal",
      "Migrations without traffic loss",
    ],
    outcome: "Visibility you own, not visibility you rent.",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="M15.6 15.6 21 21" />
        <path d="M3.8 8.2h13.4M3.8 12.8h13.4" />
      </>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 lg:py-36">
      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-muted">
              <span className="text-gold">02</span>
              <span className="h-px w-10 bg-hairline" />
              Services
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-display text-4xl leading-[1.1] tracking-[-0.02em] text-fg sm:text-5xl lg:text-[3.5rem]">
              Three disciplines that
              <span className="italic gold-wash"> compound</span> when one
              person owns all of them.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-muted">
              A fast site with a fragile database is a demo. A solid database
              behind a slow interface is an internal tool nobody opens. I build
              all three layers together, so the decisions made in the schema are
              the same decisions that show up in your load time and your search
              rankings.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-5 lg:mt-20">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} y={34}>
              <Spotlight className="edge-lit rounded-2xl border border-hairline bg-surface transition-colors duration-700 hover:border-hairline-strong">
                <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-12">
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-canvas text-gold transition-all duration-700 group-hover:border-gold/35 group-hover:bg-gold/[0.06]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                          aria-hidden
                        >
                          {s.icon}
                        </svg>
                      </div>
                      <span className="font-display text-5xl leading-none text-fg/[0.07] transition-colors duration-700 group-hover:text-fg/[0.12]">
                        {s.n}
                      </span>
                    </div>

                    <h3 className="mt-7 font-display text-[1.75rem] leading-tight tracking-[-0.01em] text-fg sm:text-[2rem]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15px] italic leading-relaxed text-gold">
                      {s.lede}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline px-3 py-1.5 text-[11px] tracking-wide text-muted transition-colors duration-500 hover:border-gold/30 hover:text-fg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-8">
                    <div className="space-y-5 text-[15px] leading-[1.85] text-muted">
                      {s.body.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-6 border-t border-hairline pt-6">
                      <p className="text-[13px] text-fg/85">{s.outcome}</p>
                      <motion.a
                        href="#contact"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex shrink-0 items-center gap-2 text-[13px] text-gold"
                      >
                        Discuss this
                        <span aria-hidden>→</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
