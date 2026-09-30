"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ConceptTag, EASE, useTick } from "../primitives";

function Silhouette({ tone }: { tone: "grey" | "green" }) {
  const fill = tone === "green" ? "url(#sil-g)" : "url(#sil-w)";
  return (
    <svg viewBox="0 0 100 100" className="silhouette" aria-hidden>
      <defs>
        <linearGradient id="sil-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b4fd95" stopOpacity="0.9" />
          <stop offset="1" stopColor="#b4fd95" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="sil-w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="40" r="16" fill={fill} />
      <path d="M18 100 C18 72 32 62 50 62 C68 62 82 72 82 100 Z" fill={fill} />
    </svg>
  );
}

function useTimecode() {
  const [f, setF] = useState(14 * 60 * 25 + 32 * 25);
  useEffect(() => {
    const id = setInterval(() => setF((v) => v + 1), 40);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor(f / 25);
  return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60, f % 25]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

function Waveform({ active }: { active: boolean }) {
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    let raf = 0;
    const loop = (t: number) => {
      bars.current.forEach((b, i) => {
        if (!b) return;
        const v = active
          ? 0.2 + Math.abs(Math.sin(t / 180 + i * 0.7) * Math.cos(t / 330 + i * 0.3)) * 0.8
          : 0.08 + Math.abs(Math.sin(t / 600 + i)) * 0.08;
        b.style.transform = `scaleY(${v})`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return (
    <div className="wave" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => (
        <span key={i} ref={(el) => void (bars.current[i] = el)} />
      ))}
    </div>
  );
}

const NAME = "Your name here";

export function InterviewVisual() {
  const tc = useTimecode();
  const speaker = useTick(2600) % 2; // 0 = established, 1 = you
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => setTyped((v) => (v >= NAME.length ? v : v + 1)), 70);
    }, 2200);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="vis interview">
      <ConceptTag />
      <div className="interview__bar mono">
        <span className="rec">
          <i /> REC
        </span>
        <span className="dim">{tc}</span>
      </div>

      <div className="interview__panes">
        <div className={`pane ${speaker === 0 ? "is-speaking" : ""}`}>
          <Silhouette tone="grey" />
          <div className="pane__label">
            <span className="mono dim">Established</span>
            <span>Industry icon</span>
          </div>
          <Waveform active={speaker === 0} />
        </div>
        <div className={`pane pane--you ${speaker === 1 ? "is-speaking" : ""}`}>
          <Silhouette tone="green" />
          <div className="pane__label">
            <span className="mono green">Emerging</span>
            <span>You</span>
          </div>
          <Waveform active={speaker === 1} />
        </div>
      </div>

      <motion.div
        className="credit-card"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 1, ease: EASE }}
      >
        <span className="mono dim">Interview by</span>
        <span className="credit-card__name">
          {NAME.slice(0, typed)}
          <span className="caret" />
        </span>
        <span className="mono green">Selected via BlackBook</span>
      </motion.div>
    </div>
  );
}
