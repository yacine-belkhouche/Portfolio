"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal: the workhorse scroll-triggered entrance                    */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  y = 26,
  blur = true,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger container + child                                           */
/* ------------------------------------------------------------------ */

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* WordsUp: headline that assembles word by word                      */
/* ------------------------------------------------------------------ */

export function WordsUp({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={word + i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "108%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 1, ease: EASE },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollProgress: hairline reading indicator                         */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-gold via-gold-soft to-transparent"
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------------ */
/* Parallax: gentle depth on scroll                                   */
/* ------------------------------------------------------------------ */

export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Spotlight: card that lights up under the cursor                    */
/* ------------------------------------------------------------------ */

export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const background = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      "radial-gradient(320px circle at " +
      x +
      "px " +
      y +
      "px, rgba(212,180,106,0.16), transparent 70%)"
  );

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      className={"group relative overflow-hidden " + className}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Counter: numbers that settle into place                            */
/* ------------------------------------------------------------------ */

export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  // Parsed once per value. A fresh match array on every render would land in
  // the effect deps below, cancelling and restarting the animation each frame
  // so the number never left zero.
  const parts = useMemo(() => {
    const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return null;
    return {
      prefix: m[1],
      target: parseFloat(m[2]),
      suffix: m[3],
      decimals: m[2].includes(".") ? 1 : 0,
    };
  }, [value]);

  // null means "render the real figure". It only becomes a number once the
  // observer below is installed, so the server-rendered HTML carries the true
  // value and any failure here leaves the real number on screen rather than a
  // zero waiting for an animation that never comes.
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parts || reduce) return;

    // Already on screen at mount: leave the real figure alone. Counting up from
    // zero under the reader's eyes is worse than not animating at all, and it
    // removes any chance of a visible zero.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const dur = 1100;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setShown(parts.target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // Vertical inset only. A margin that also insets left and right never
    // matches these numbers, which sit close to the page edge.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    // Backstop: if the observer somehow never reports, show the real figure
    // rather than leaving a zero on the page.
    const rescue = window.setTimeout(() => {
      if (!started) {
        started = true;
        setShown(parts.target);
      }
    }, 8000);

    setShown(0);
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(rescue);
      cancelAnimationFrame(frame);
    };
  }, [parts, reduce]);

  if (!parts || shown === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {parts.prefix}
      {shown.toFixed(parts.decimals)}
      {parts.suffix}
    </span>
  );
}
