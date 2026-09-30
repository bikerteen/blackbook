"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { ConceptTag, Mark } from "../primitives";

function Robot() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="robot"
      aria-hidden
      animate={{ rotate: [-6, 6, -6], y: [0, -4, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
    >
      <line x1="50" y1="8" x2="50" y2="18" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="7" r="4" fill="currentColor" />
      <rect x="28" y="18" width="44" height="30" rx="8" fill="currentColor" />
      <circle cx="41" cy="33" r="4" fill="#b4fd95" />
      <circle cx="59" cy="33" r="4" fill="#b4fd95" />
      <rect x="32" y="52" width="36" height="28" rx="6" fill="currentColor" />
      <motion.line
        x1="32" y1="58" x2="14" y2="44" stroke="currentColor" strokeWidth="5" strokeLinecap="round"
        animate={{ x2: [14, 12, 14], y2: [44, 70, 44] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
      <motion.line
        x1="68" y1="58" x2="86" y2="70" stroke="currentColor" strokeWidth="5" strokeLinecap="round"
        animate={{ x2: [86, 88, 86], y2: [70, 42, 70] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
      <line x1="42" y1="80" x2="38" y2="96" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="58" y1="80" x2="62" y2="96" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </motion.svg>
  );
}

export function WildcardVisual() {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 14 });

  return (
    <div
      className="vis wildcard"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <ConceptTag>Concept · tap the card</ConceptTag>

      {[2, 3].map((ed, k) => (
        <motion.div
          key={ed}
          className="wc-ghost"
          style={{ rotate: k ? 14 : -12, x: k ? 90 : -90 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + k, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="mono">Edition {String(ed).padStart(2, "0")}</span>
          <span className="wc-ghost__q">?</span>
        </motion.div>
      ))}

      <motion.div className="wc-tilt" style={{ rotateX: rx, rotateY: ry }}>
        <motion.button
          className="wc-card"
          onClick={() => setFlipped((f) => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 1.1, ease: [0.3, 1.4, 0.4, 1] }}
          aria-label="Flip the wildcard"
        >
          <span className="wc-face wc-face--back">
            <span className="wc-pattern" aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <Mark key={i} size={46} stroke={6} />
              ))}
            </span>
            <span className="wc-back-title">WILDCARD</span>
            <span className="mono dim">BlackBook</span>
          </span>
          <span className="wc-face wc-face--front">
            <span className="wc-front-top mono">
              <span>Edition 01</span>
              <span>✦</span>
            </span>
            <Robot />
            <span className="wc-front-title">Robot Dance-Off</span>
            <span className="wc-front-meta">Live music · For a cause</span>
            <span className="wc-front-cta mono">Register on BlackBook to unlock tickets</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
