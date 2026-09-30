"use client";

import { motion } from "motion/react";
import { ConceptTag, EASE, seeded } from "../primitives";

const W = 400;
const H = 420;

const nodes = (() => {
  const r = seeded(42);
  const pts: { x: number; y: number }[] = [];
  let guard = 0;
  while (pts.length < 26 && guard++ < 2000) {
    const p = { x: 30 + r() * (W - 60), y: 40 + r() * (H - 90) };
    if (pts.every((q) => Math.hypot(q.x - p.x, q.y - p.y) > 52)) pts.push(p);
  }
  return pts;
})();

const edges = (() => {
  const out: [number, number][] = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter((e) => e.j > i && e.d < 105)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach((e) => out.push([i, e.j]));
  });
  return out;
})();

const labels: Record<number, string> = {
  2: "director",
  5: "poet",
  9: "producer",
  13: "designer",
  17: "DJ",
  21: "photographer",
};

// Light sweeps left → right: the "shadow to shine" moment.
const SWEEP_START = 0.6;
const SWEEP_DUR = 2.2;
const litAt = (x: number) => SWEEP_START + (x / W) * SWEEP_DUR;

export function ShineVisual() {
  return (
    <div className="vis shine">
      <ConceptTag />
      <svg viewBox={`0 0 ${W} ${H}`} className="shine__svg" aria-hidden>
        <defs>
          <radialGradient id="shine-node">
            <stop offset="0" stopColor="#b4fd95" stopOpacity="0.9" />
            <stop offset="1" stopColor="#b4fd95" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="shine-sweep" x1="0" x2="1">
            <stop offset="0" stopColor="#b4fd95" stopOpacity="0" />
            <stop offset="0.5" stopColor="#b4fd95" stopOpacity="0.22" />
            <stop offset="1" stopColor="#b4fd95" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.rect
          y="0"
          width="160"
          height={H}
          fill="url(#shine-sweep)"
          initial={{ x: -180 }}
          animate={{ x: W + 20 }}
          transition={{ delay: SWEEP_START - 0.3, duration: SWEEP_DUR + 0.4, ease: "linear" }}
        />

        {edges.map(([a, b], k) => {
          const A = nodes[a];
          const B = nodes[b];
          return (
            <motion.line
              key={k}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="#b4fd95"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.45 }}
              transition={{ delay: litAt(Math.max(A.x, B.x)) + 0.4, duration: 1.2, ease: EASE }}
            />
          );
        })}

        {nodes.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="16"
              fill="url(#shine-node)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0.5], scale: 1 }}
              transition={{ delay: litAt(p.x), duration: 1.4 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="3.2"
              initial={{ fill: "#3a3a3a" }}
              animate={{ fill: "#b4fd95" }}
              transition={{ delay: litAt(p.x), duration: 0.5 }}
            />
            {labels[i] && (
              <motion.text
                x={p.x + 8}
                y={p.y - 8}
                className="shine__label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: litAt(p.x) + 0.3, duration: 0.8 }}
              >
                {labels[i]}
              </motion.text>
            )}
          </g>
        ))}
      </svg>

      <div className="shine__foot">
        <motion.span
          className="shine__word shine__word--shadow"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1.2, duration: 1.4 }}
        >
          Shadow
        </motion.span>
        <span className="shine__arrow">→</span>
        <motion.span
          className="shine__word shine__word--shine"
          initial={{ opacity: 0.2, textShadow: "0 0 0px rgba(180,253,149,0)" }}
          animate={{ opacity: 1, textShadow: "0 0 28px rgba(180,253,149,0.6)" }}
          transition={{ delay: 2.4, duration: 1.2 }}
        >
          Shine
        </motion.span>
        <motion.span
          className="mono dim shine__cap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1 }}
        >
          Alumni in one room, for the first time · then connected on BlackBook
        </motion.span>
      </div>
    </div>
  );
}
