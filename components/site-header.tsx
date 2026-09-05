"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => scrollY.on("change", (v) => setCondensed(v > 40)), [scrollY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={
            "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] " +
            (condensed
              ? "border-b border-hairline bg-ink/72 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent")
          }
        >
          <div className="container-x flex items-center justify-between py-5">
            <a
              href="#top"
              className="group flex items-baseline gap-2.5"
              aria-label={site.name + " — home"}
            >
              <span className="font-display text-lg tracking-tight text-bone sm:text-xl">
                Yacine
              </span>
              <span className="text-lg font-light tracking-tight text-muted transition-colors duration-500 group-hover:text-bone sm:text-xl">
                Belkhouche
              </span>
            </a>

            <nav className="hidden items-center gap-9 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative text-[13px] tracking-wide text-muted transition-colors duration-300 hover:text-bone"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="group relative hidden overflow-hidden rounded-full border border-hairline px-5 py-2.5 text-[13px] tracking-wide text-bone transition-colors duration-500 hover:border-gold/45 sm:inline-flex"
              >
                <span className="relative z-10">Start a project</span>
                <span className="absolute inset-0 -translate-y-full bg-gold/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline md:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={
                      "absolute left-0 h-px w-4 bg-bone transition-all duration-400 " +
                      (open ? "top-1.5 rotate-45" : "top-0")
                    }
                  />
                  <span
                    className={
                      "absolute left-0 h-px w-4 bg-bone transition-all duration-400 " +
                      (open ? "top-1.5 -rotate-45" : "top-3")
                    }
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl md:hidden"
          >
            <div className="container-x flex h-full flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 * i + 0.1,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-hairline py-5 font-display text-4xl text-bone"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href={"mailto:" + site.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 text-sm text-muted"
              >
                {site.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
