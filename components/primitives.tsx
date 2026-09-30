"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.7, 0, 0.84, 0] as const;

/** The BlackBook "B" mark: a rounded square with a notch, turned 45°. */
export function Mark({
  size = 32,
  stroke = 11,
  draw = false,
  delay = 0,
  duration = 1.8,
  className,
}: {
  size?: number;
  stroke?: number;
  draw?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const d =
    "M20 36 Q20 20 36 20 L42 20 Q57 20 60 34 Q63 20 78 20 L84 20 Q100 20 100 36 L100 84 Q100 100 84 100 L36 100 Q20 100 20 84 Z";
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="-6 -6 132 132"
      fill="none"
      aria-hidden
    >
      <g transform="rotate(45 60 60)">
        {draw ? (
          <motion.path
            d={d}
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.2, delay } }}
          />
        ) : (
          <path d={d} stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
        )}
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ""}`}>
      <Mark size={22} stroke={13} />
      <span>BLACKBOOK</span>
    </span>
  );
}

/** Word-by-word masked rise. */
export function SplitWords({
  text,
  delay = 0,
  stagger = 0.055,
  className,
  wordClassName,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  wordClassName?: (word: string, i: number) => string | undefined;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="sw">
            <motion.span
              className={`sw__i ${wordClassName?.(w, i) ?? ""}`}
              initial={{ y: "115%", rotate: 4 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/** Fade + rise + unblur on mount. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  duration = 1,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Reveal driven by the presenter's step (→ key), not by mount. */
export function Step({
  show,
  children,
  className,
  y = 30,
  delay = 0,
}: {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={
        show
          ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE, delay } }
          : { opacity: 0, y, filter: "blur(10px)", transition: { duration: 0.4, ease: EASE_IN } }
      }
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      {children}
    </motion.div>
  );
}

/** Ticks an integer every `ms`. Handy for looping mock UIs. */
export function useTick(ms: number, max = Infinity) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1 >= max ? 0 : v + 1)), ms);
    return () => clearInterval(id);
  }, [ms, max]);
  return t;
}

/** Deterministic pseudo-random so layouts are stable between renders. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function ConceptTag({ children = "Concept" }: { children?: React.ReactNode }) {
  return <span className="concept-tag">{children}</span>;
}
