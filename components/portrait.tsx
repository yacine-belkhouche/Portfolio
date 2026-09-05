"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Drop the photo in at `public/profile.jpg`.
 * Until it exists, this renders a deliberate monogram plate rather than a
 * broken image — the frame is designed to look finished either way.
 */
export function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[24rem] lg:mx-0"
    >
      {/* Ambient pool behind the frame */}
      <div className="glow -left-16 -top-10 h-64 w-64 bg-gold/20" aria-hidden />
      <div className="glow -bottom-16 right-0 h-56 w-56 bg-moss/24" aria-hidden />

      {/* Offset hairline frame — the "gallery mat" */}
      <div
        className="absolute -inset-3 rounded-[1.75rem] border border-hairline sm:-inset-5"
        aria-hidden
      />
      <div
        className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-gold/25 via-transparent to-transparent opacity-60 sm:-inset-5"
        aria-hidden
        style={{
          maskImage:
            "linear-gradient(to bottom right, black, transparent 55%)",
          WebkitMaskImage:
            "linear-gradient(to bottom right, black, transparent 55%)",
        }}
      />

      <div className="group relative overflow-hidden rounded-[1.25rem] border border-hairline bg-ink-raised">
        {/*
          11/20 matches public/profile.jpg exactly, so object-cover has nothing
          left to crop — the composition is baked into the file by crop.mjs.
          Re-run that script with different numbers to recompose.
        */}
        <div className="relative aspect-[11/20] w-full">
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(120%_100%_at_50%_0%,#1a1d27_0%,#0a0c11_60%)]">
              <span className="font-display text-7xl tracking-tight text-bone/85">
                YB
              </span>
              <span className="max-w-[15rem] text-center text-[11px] uppercase tracking-[0.22em] text-muted">
                Add your photo at
                <br />
                <span className="text-gold/80">public/profile.jpg</span>
              </span>
            </div>
          ) : (
            <Image
              src={site.profileImage}
              alt="Yacine Belkhouche, AI Engineer and full-stack web architect"
              fill
              priority
              sizes="(max-width: 1024px) 85vw, 24rem"
              onError={() => setFailed(true)}
              className="object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          )}
        </div>

        {/* Bottom scrim so the caption always reads */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink via-ink/70 to-transparent"
          aria-hidden
        />

        {/* Slow sheen sweep on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:[animation:sheen_1.6s_cubic-bezier(0.16,1,0.3,1)]" />
        </div>

        {/* Availability pill sits top-right so the caption gets the full width */}
        <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-hairline bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Available
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-2xl leading-none text-bone">
            Yacine Belkhouche
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted">
            AI Engineer · Web Architect
          </p>
        </div>
      </div>

      {/*
        Below xl there is no room to float the chips beside the frame, so the
        same two credentials sit under it as a paired row. Without this, phones
        lost the content entirely.
      */}
      <div className="mt-4 grid grid-cols-2 gap-3 xl:hidden">
        {[
          { k: "Engineering", v: "Artificial Intelligence" },
          { k: "Freelancing since", v: "2023 · 2+ years" },
        ].map((c) => (
          <div
            key={c.k}
            className="rounded-xl border border-hairline bg-ink-raised/70 px-4 py-3"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
              {c.k}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-bone">{c.v}</p>
          </div>
        ))}
      </div>

      {/* Floating credential chips — xl and up, where the gutters allow it */}
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-16 top-[9%] hidden rounded-xl border border-hairline bg-ink-raised/92 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md xl:block"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
          Engineering
        </p>
        <p className="mt-1 text-sm text-bone">Artificial Intelligence</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-14 bottom-[30%] hidden rounded-xl border border-hairline bg-ink-raised/92 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md xl:block"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
          Freelancing since
        </p>
        <p className="mt-1 text-sm text-bone">2023 · 2+ years</p>
      </motion.div>
    </motion.div>
  );
}
