"use client";

import Image from "next/image";
import { Reveal } from "./motion-primitives";
import { projects } from "@/lib/projects";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M4.5 11.5l7-7M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 lg:py-36">
      <div
        className="glow right-0 top-1/4 h-[28rem] w-[28rem] bg-gold-soft/[0.14]"
        aria-hidden
      />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-muted">
              <span className="text-gold">03</span>
              <span className="h-px w-10 bg-hairline" />
              Work
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-display text-4xl leading-[1.1] tracking-[-0.02em] text-fg sm:text-5xl lg:text-[3.5rem]">
              Work that is already
              <span className="italic gold-wash"> live.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-muted">
              A school that needed enrolment online, a training studio that
              needed real booking, and a restaurant that needed a reservation
              book it could trust. Different trades, the same approach: model
              the business in the database first, then build everything a
              visitor sees on top of it.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
          {projects.map((p, i) => {
            const host = new URL(p.url).host;
            const flipped = i % 2 === 1;

            return (
              <article
                key={p.slug}
                className={
                  "grid items-center gap-10 lg:gap-16 " +
                  (flipped
                    ? "lg:grid-cols-[0.88fr_1.12fr]"
                    : "lg:grid-cols-[1.12fr_0.88fr]")
                }
              >
                {/* Screenshot in a browser frame; the address bar shows the real domain */}
                <Reveal y={34} className={flipped ? "lg:order-2" : undefined}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    aria-label={"Open the live " + p.name + " site in a new tab"}
                  >
                    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_40px_80px_-44px_rgba(19,23,20,0.45)] transition-shadow duration-700 group-hover:shadow-[0_50px_90px_-40px_rgba(19,23,20,0.55)]">
                      <div className="flex items-center gap-3 border-b border-hairline bg-surface-2 px-4 py-2.5">
                        <span className="flex w-12 shrink-0 gap-1.5" aria-hidden>
                          <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                          <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                          <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                        </span>
                        <span className="mx-auto min-w-0 truncate rounded-md bg-surface px-3 py-1 text-[11px] tracking-wide text-muted">
                          {host}
                        </span>
                        <span className="w-12 shrink-0" aria-hidden />
                      </div>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 44rem"
                          className="object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={0.08} className={flipped ? "lg:order-1" : undefined}>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                    {p.sector}
                    {p.status && (
                      <span className="rounded-full border border-hairline px-2.5 py-1 text-[10px] tracking-[0.16em] text-fg/80">
                        {p.status}
                      </span>
                    )}
                  </p>

                  <h3 className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-display text-[2.1rem] leading-tight tracking-[-0.01em] text-fg sm:text-[2.5rem]">
                    {p.name}
                    {p.nativeName && (
                      <span
                        lang={p.nativeName.lang}
                        dir="rtl"
                        className="font-sans text-xl text-gold"
                      >
                        {p.nativeName.text}
                      </span>
                    )}
                  </h3>

                  <p className="mt-4 text-[15px] leading-[1.8] text-muted">
                    {p.summary}
                  </p>

                  <ul className="mt-6 space-y-3.5 border-t border-hairline pt-6">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3.5 text-[14px] leading-[1.7] text-muted"
                      >
                        <span
                          className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold"
                          aria-hidden
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-hairline px-3 py-1.5 text-[11px] tracking-wide text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-gold"
                  >
                    Visit the live site
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
