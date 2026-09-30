"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { meta } from "@/content/playbook";
import { EASE, EASE_IN, Mark, Wordmark } from "./primitives";
import { buildScenes } from "./scenes";

const scenes = buildScenes();

type Pos = { index: number; step: number; dir: 1 | -1 };

export type Nav = { goTo: (id: string) => void };

const sceneVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 60, scale: 1.03, filter: "blur(14px)" }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE, delay: 0.25 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir * -60,
    scale: 0.97,
    filter: "blur(14px)",
    transition: { duration: 0.55, ease: EASE_IN },
  }),
};

// Where the giant background mark drifts to on each scene: a slow "camera move".
const backdropPoses = [
  { x: "22vw", y: "-4vh", rotate: 0, scale: 1.1 },
  { x: "-30vw", y: "18vh", rotate: -20, scale: 0.8 },
  { x: "0vw", y: "0vh", rotate: 12, scale: 1.6 },
  { x: "30vw", y: "-20vh", rotate: 30, scale: 0.9 },
  { x: "-26vw", y: "-14vh", rotate: -8, scale: 1.25 },
  { x: "24vw", y: "20vh", rotate: 45, scale: 1 },
];

export function Deck() {
  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState<Pos>({ index: 0, step: 0, dir: 1 });
  const [indexOpen, setIndexOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wheel = useRef({ acc: 0, lockUntil: 0, last: 0 });
  const touch = useRef<{ x: number; y: number } | null>(null);

  const scene = scenes[pos.index];
  const total = scenes.length;

  const next = useCallback(() => {
    setPos((p) => {
      const s = scenes[p.index];
      if (p.step < s.steps - 1) return { ...p, step: p.step + 1, dir: 1 };
      if (p.index < scenes.length - 1) return { index: p.index + 1, step: 0, dir: 1 };
      return p;
    });
  }, []);

  const prev = useCallback(() => {
    setPos((p) => {
      if (p.step > 0) return { ...p, step: p.step - 1, dir: -1 };
      if (p.index > 0) return { index: p.index - 1, step: scenes[p.index - 1].steps - 1, dir: -1 };
      return p;
    });
  }, []);

  const jump = useCallback((i: number) => {
    setIndexOpen(false);
    setPos((p) => ({ index: i, step: 0, dir: i >= p.index ? 1 : -1 }));
  }, []);

  const goTo = useCallback(
    (id: string) => {
      const i = scenes.findIndex((s) => s.id === id);
      if (i >= 0) jump(i);
    },
    [jump],
  );

  // Deep links: #the-drop etc.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      const i = scenes.findIndex((s) => s.id === id);
      if (i > 0) setPos((p) => (p.index === i ? p : { index: i, step: 0, dir: i >= p.index ? 1 : -1 }));
    };
    fromHash();
    setReady(true);
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const url = pos.index === 0 ? window.location.pathname : `#${scene.id}`;
    window.history.replaceState(null, "", url);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pos.index, ready, scene.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "Escape") return setIndexOpen(false);
      if (k === "i" || k === "I" || k === "m" || k === "M") return setIndexOpen((o) => !o);
      if (k === "f" || k === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
        return;
      }
      if (indexOpen) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) {
        e.preventDefault();
        prev();
      } else if (k === "Home") jump(0);
      else if (k === "End") jump(scenes.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [indexOpen, next, prev, jump]);

  const onWheel = (e: React.WheelEvent) => {
    if (indexOpen) return;
    // Let a scene that overflows (small screens) scroll natively first.
    const el = scrollRef.current;
    if (el && el.scrollHeight > el.clientHeight + 4) {
      const atTop = el.scrollTop <= 2;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
    }
    const now = performance.now();
    const w = wheel.current;
    if (now - w.last > 250) w.acc = 0;
    w.last = now;
    if (now < w.lockUntil) return;
    w.acc += e.deltaY;
    if (Math.abs(w.acc) > 60) {
      if (w.acc > 0) next();
      else prev();
      w.acc = 0;
      w.lockUntil = now + 1000;
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t = touch.current;
    touch.current = null;
    if (!t || indexOpen) return;
    const dx = e.changedTouches[0].clientX - t.x;
    const dy = e.changedTouches[0].clientY - t.y;
    // Horizontal swipes navigate; vertical swipes scroll long scenes.
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) next();
      else prev();
    }
  };

  const progress = (pos.index + (pos.step + 1) / scene.steps) / total;
  const pose = backdropPoses[pos.index % backdropPoses.length];
  const Scene = scene.Component;

  return (
    <MotionConfig reducedMotion="user">
      <main className="deck" onWheel={onWheel} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="backdrop" aria-hidden>
          <motion.div
            className="backdrop__mark"
            animate={pose}
            transition={{ duration: 2.4, ease: EASE }}
          >
            <Mark size={900} stroke={1.2} />
          </motion.div>
          <motion.div
            className="backdrop__glow"
            animate={{
              x: pos.index % 2 ? "-18vw" : "22vw",
              y: pos.index % 3 ? "12vh" : "-10vh",
              opacity: scene.glow ?? 0.55,
            }}
            transition={{ duration: 3, ease: EASE }}
          />
        </div>

        {ready && (
          <AnimatePresence initial={true} custom={pos.dir}>
            <motion.section
              key={scene.id}
              className={`scene scene--${scene.kind}`}
              custom={pos.dir}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              aria-roledescription="slide"
              aria-label={scene.label}
            >
              <div className="scene__scroll" ref={scrollRef}>
                <Scene step={pos.step} nav={{ goTo }} />
              </div>
            </motion.section>
          </AnimatePresence>
        )}

        <div className="grain" aria-hidden />
        <div className="vignette" aria-hidden />

        <header className={`chrome chrome--top ${pos.index === 0 ? "is-quiet" : ""}`}>
          <button className="chrome__brand" onClick={() => jump(0)} aria-label="Back to start">
            <Wordmark />
            <span className="chrome__slash">/</span>
            <span className="mono">Playbook</span>
          </button>
          <div className="chrome__actions">
            <button className="chip-btn" onClick={() => setIndexOpen((o) => !o)} aria-expanded={indexOpen}>
              <span className="chip-btn__dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              Index
            </button>
          </div>
        </header>

        <footer className="chrome chrome--bottom">
          <div className="chrome__chapter mono">
            <AnimatePresence mode="wait">
              <motion.span
                key={scene.chapter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {scene.chapter}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="chrome__nav">
            <span className="mono chrome__count">
              {String(pos.index + 1).padStart(2, "0")}
              <span className="dim"> / {String(total).padStart(2, "0")}</span>
            </span>
            <button className="nav-btn" onClick={prev} aria-label="Previous" disabled={pos.index === 0 && pos.step === 0}>
              ←
            </button>
            <button
              className="nav-btn nav-btn--primary"
              onClick={next}
              aria-label="Next"
              disabled={pos.index === total - 1 && pos.step === scene.steps - 1}
            >
              →
            </button>
          </div>
          <div className="progress" aria-hidden>
            <motion.div className="progress__fill" animate={{ scaleX: progress }} transition={{ duration: 0.8, ease: EASE }} />
          </div>
        </footer>

        <AnimatePresence>
          {indexOpen && (
            <motion.nav
              className="index-overlay"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.7, ease: EASE }}
              aria-label="Deck index"
            >
              <div className="index-overlay__head">
                <span className="mono dim">{meta.title}</span>
                <button className="chip-btn" onClick={() => setIndexOpen(false)}>
                  Close ✕
                </button>
              </div>
              <ol className="index-overlay__list">
                {scenes.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.025, duration: 0.6, ease: EASE }}
                  >
                    <button className={i === pos.index ? "is-active" : ""} onClick={() => jump(i)}>
                      <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ol>
              <p className="mono dim index-overlay__keys">→ / space next · ← back · I index · F fullscreen</p>
            </motion.nav>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
