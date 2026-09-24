"use client";

import { Counter, Parallax, Reveal, Stagger, StaggerItem } from "./motion-primitives";
import { stats } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-16 sm:py-24 lg:py-36">
      <div
        className="glow left-[-10rem] top-1/3 h-[26rem] w-[26rem] bg-gold-soft/[0.16]"
        aria-hidden
      />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-muted">
                <span className="text-gold">01</span>
                <span className="h-px w-10 bg-hairline" />
                About
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-4xl leading-[1.1] tracking-[-0.02em] text-fg sm:text-5xl">
                Most developers learn frameworks.
                <span className="mt-2 block italic text-muted">
                  I learned systems first.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 rounded-xl border border-hairline bg-surface p-5">
                <p className="text-[11px] sm:text-[10px] uppercase tracking-[0.2em] text-muted">
                  Education
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg">
                  Engineering degree in Artificial Intelligence
                </p>
                <p className="mt-1 text-sm text-muted">University of Tlemcen</p>
              </div>
            </Reveal>
          </div>

          <div>
            <Parallax distance={26}>
              <div className="space-y-7 text-[15px] leading-[1.85] text-muted sm:text-base">
                <Reveal>
                  <p>
                    I came to web development through artificial intelligence.
                    An engineering degree at the University of Tlemcen meant
                    years spent in the parts of software most people never
                    touch: model architecture, data pipelines, computational
                    cost, and the discipline of making something correct at
                    scale before making it beautiful.
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <p>
                    That training rewired how I build for the web. I read a
                    business the way I&apos;d read a dataset: find the real
                    constraint, model it honestly, then engineer the shortest
                    path between what a user intends and the result they came
                    for. It&apos;s why my{" "}
                    <span className="text-fg">database schemas</span> still
                    hold up when a client&apos;s team triples, why my frontends
                    stay fast after two years of feature requests, and why the
                    structure underneath is legible to a crawler on day one.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p>
                    <span className="text-fg">
                      Two years of freelancing
                    </span>{" "}
                    taught me the other half: the commercial half. Businesses
                    don&apos;t buy architecture. They buy hours no longer lost
                    to manual work, pages that stop leaking customers, and
                    traffic that arrives without an ad budget. I build the first
                    so you get the second.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <p>
                    You work with me directly. No account manager, no handoff to
                    a junior after the contract is signed, no framework chosen
                    because it&apos;s fashionable. Scope agreed up front,
                    architecture explained in plain language, and every line of
                    code yours to keep.
                  </p>
                </Reveal>
              </div>
            </Parallax>

            <Stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-4">
              {stats.map((s) => (
                <StaggerItem
                  key={s.label}
                  className="edge-lit bg-surface p-6 transition-colors duration-500 hover:bg-surface-2"
                >
                  <p className="font-display text-4xl leading-none text-fg">
                    <Counter value={s.value} />
                  </p>
                  <p className="mt-3 text-[13px] text-fg/85">{s.label}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted">
                    {s.sub}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
