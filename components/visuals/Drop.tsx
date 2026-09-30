"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ConceptTag, EASE } from "../primitives";

const drops = [
  { tag: "Paid brief", title: "Music video treatment for an emerging R&B artist", meta: "£2,500 fee · closes in 48h" },
  { tag: "Collaboration", title: "Illustrator wanted for a limited-run zine", meta: "Rev share · 12 spots" },
  { tag: "Exclusive access · Posted direct", title: "Backstage + guest list at a Friday showcase", meta: "4 places · apply by Thu" },
];

function useCountdown(start: number) {
  const [s, setS] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setS((v) => (v <= 0 ? start : v - 1)), 1000);
    return () => clearInterval(id);
  }, [start]);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((v) => String(v).padStart(2, "0")).join(":");
}

export function DropVisual() {
  const time = useCountdown(2 * 3600 + 14 * 60 + 9);
  return (
    <div className="vis drop">
      <ConceptTag />
      <div className="drop__head">
        <div>
          <div className="mono dim">The Drop · Curated by BlackBook</div>
          <div className="drop__no">No. 014</div>
        </div>
        <div className="drop__live mono">
          <i /> Live
        </div>
      </div>

      <div className="drop__stack">
        {drops.map((d, i) => (
          <motion.div
            key={d.tag}
            className={`drop-card ${i === 0 ? "drop-card--hero" : ""}`}
            initial={{ opacity: 0, y: -160, rotate: -10 + i * 6 }}
            animate={{ opacity: 1, y: 0, rotate: [-2.5, 1.5, -1][i] }}
            transition={{ delay: 0.9 + i * 0.28, type: "spring", stiffness: 120, damping: 14 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: 2 + i * 0.4 }}
            >
              <span className="drop-card__tag mono">{d.tag}</span>
              <span className="drop-card__title">{d.title}</span>
              <span className="drop-card__row">
                <span className="mono dim">{d.meta}</span>
                <span className="drop-card__cta">Apply →</span>
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="drop__next"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1, ease: EASE }}
      >
        <span className="mono dim">Next drop in</span>
        <span className="drop__timer mono">{time}</span>
      </motion.div>

      <div className="marquee mono" aria-hidden>
        <div className="marquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              New drop every Friday ✦ Hand-picked by BlackBook ✦ Got an opportunity? Post it to the Drop ✦ Applications open on the app ✦&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
