"use client";

import { motion } from "framer-motion";
import { Portrait } from "./portrait";
import { WordsUp } from "./motion-primitives";
import { site, stack } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28"
    >
      {/* Ambient light architecture */}
      <div
        className="glow -top-40 left-1/4 h-[34rem] w-[34rem] bg-gold-soft/25"
        aria-hidden
      />
      <div
        className="glow -right-24 top-40 h-[28rem] w-[28rem] bg-moss/10"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(19,23,20,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19,23,20,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid items-center gap-y-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-20 lg:gap-y-8">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="inline-flex items-center gap-3 rounded-full border border-hairline bg-surface/80 py-1.5 pl-2 pr-4 backdrop-blur"
            >
              <span className="shrink-0 whitespace-nowrap rounded-full bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-gold">
                AI Engineer
              </span>
              <span className="text-[11px] tracking-wide text-muted">
                {site.availability}
              </span>
            </motion.div>

            <h1 className="mt-8 font-display text-[2.65rem] leading-[1.04] tracking-[-0.02em] text-fg sm:text-6xl lg:text-[4.35rem]">
              <WordsUp text="High-performance web platforms," />
              <span className="mt-2 block italic gold-wash">
                <WordsUp
                  text="engineered with an AI engineer's precision."
                  delay={0.35}
                />
              </span>
            </h1>
          </div>

          {/*
            Second column on desktop; between the headline and the body copy on
            mobile — so the photo is seen alongside the headline the way it is
            on a wide screen, instead of a screen and a half further down.
          */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Portrait />
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.95, ease: EASE }}
              className="max-w-xl text-[15px] leading-[1.75] text-muted sm:text-base"
            >
              I&apos;m{" "}
              <span className="text-fg">Yacine Belkhouche</span> — an AI
              Engineer who builds the software businesses actually run on.
              Custom management systems on{" "}
              <span className="text-fg">Supabase</span>, sub-second{" "}
              <span className="text-fg">Next.js</span> frontends, and search
              architecture that compounds into organic traffic. One person
              accountable, from schema to shipped.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: EASE }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-fg px-7 py-3.5 text-sm font-medium text-canvas transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">Book a discovery call</span>
                <svg
                  className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
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
              </a>

              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-hairline px-7 py-3.5 text-sm text-fg transition-colors duration-500 hover:border-gold/40 hover:bg-fg/[0.03]"
              >
                What I build
                <span className="text-muted transition-transform duration-500 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.3 }}
              className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-3"
            >
              {[
                { k: "Based in", v: "Tlemcen, Algeria" },
                { k: "Working", v: "Remote, worldwide" },
                { k: "Reply time", v: "Under 24 hours" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">
                    {item.k}
                  </dt>
                  <dd className="mt-1.5 text-sm text-fg">{item.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>

      {/* Stack marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.5 }}
        className="relative mt-20 border-y border-hairline py-5 lg:mt-28"
      >
        <div
          className="flex overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="marquee-track flex shrink-0 items-center gap-12 pr-12">
            {[...stack, ...stack].map((tech, i) => (
              <span
                key={tech + i}
                className="whitespace-nowrap text-[11px] uppercase tracking-[0.24em] text-muted/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
