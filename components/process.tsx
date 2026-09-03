"use client";

import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

const steps = [
  {
    n: "01",
    title: "Diagnose",
    time: "Week 0",
    body: "A call, then a written brief. What the business actually loses money on, what the current stack cannot do, and what success will look like in numbers. If a project isn't the right fit, you find out here rather than three invoices in.",
  },
  {
    n: "02",
    title: "Architect",
    time: "Week 1",
    body: "The data model comes first — tables, relationships, access rules — alongside the page structure and the performance budget. You approve an architecture you understand in plain language before a single component is written.",
  },
  {
    n: "03",
    title: "Build",
    time: "Weeks 2–6",
    body: "Weekly deploys to a live staging URL you can click through. Feedback goes into the next cycle, not into a document nobody reads. Nothing is a surprise at the end because you have seen every step of it.",
  },
  {
    n: "04",
    title: "Launch & measure",
    time: "Ongoing",
    body: "Deployment, Core Web Vitals verified in the field, Search Console and analytics wired up, and a handover with documentation. Then we look at real numbers and decide what earns the next iteration.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 lg:py-36">
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-muted">
                <span className="text-gold/70">03</span>
                <span className="h-px w-10 bg-hairline" />
                Process
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-4xl leading-[1.1] tracking-[-0.02em] text-bone sm:text-5xl">
                Predictable work,
                <span className="mt-2 block italic text-muted">
                  visible from the first week.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-muted">
                Most bad development experiences are communication failures, not
                technical ones. This is how I remove that risk before it starts.
              </p>
            </Reveal>
          </div>

          <Stagger className="relative">
            <div
              className="absolute left-[1.45rem] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-hairline to-transparent"
              aria-hidden
            />
            {steps.map((s) => (
              <StaggerItem key={s.n} className="group relative pb-10 pl-16 last:pb-0">
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-ink font-display text-sm text-muted transition-all duration-700 group-hover:border-gold/40 group-hover:text-gold">
                  {s.n}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl text-bone">{s.title}</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                    {s.time}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-[15px] leading-[1.8] text-muted">
                  {s.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
