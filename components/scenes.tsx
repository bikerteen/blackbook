"use client";

import { motion } from "motion/react";
import {
  close,
  feeling,
  insight,
  loop,
  meta,
  moment,
  plays,
  position,
  strategy,
} from "@/content/playbook";
import type { Nav } from "./Deck";
import { PlayScene } from "./PlayScene";
import { EASE, Mark, Reveal, SplitWords, Step, seeded } from "./primitives";

export type SceneProps = { step: number; nav: Nav };

export type SceneDef = {
  id: string;
  label: string;
  chapter: string;
  kind: string;
  steps: number;
  glow?: number;
  Component: (p: SceneProps) => React.ReactNode;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function buildScenes(): SceneDef[] {
  const total = plays.length;
  return [
    { id: "intro", label: "The BlackBook Playbook", chapter: "00 — Opening", kind: "intro", steps: 1, glow: 0.35, Component: Intro },
    { id: "the-moment", label: "Right now", chapter: "01 — The moment", kind: "noise", steps: moment.lines.length + 1, glow: 0.1, Component: Noise },
    { id: "the-insight", label: insight.label, chapter: "01 — The moment", kind: "insight", steps: 1, glow: 0.2, Component: Insight },
    { id: "the-position", label: position.label, chapter: "02 — The strategy", kind: "position", steps: 2, Component: Position },
    { id: "the-strategy", label: "Be the culture", chapter: "02 — The strategy", kind: "fomo", steps: strategy.lines.length + 1, glow: 0.8, Component: Fomo },
    { id: "the-feeling", label: "The feeling", chapter: "02 — The strategy", kind: "feeling", steps: 2, glow: 0.3, Component: Feeling },
    { id: "the-engine", label: loop.headline, chapter: "03 — The engine", kind: "loop", steps: loop.steps.length + 1, Component: Loop },
    { id: "the-playbook", label: `The Playbook: ${total} plays`, chapter: "04 — The Playbook", kind: "index", steps: 1, Component: PlaybookIndex },
    ...plays.map<SceneDef>((play, i) => ({
      id: play.id,
      label: `${pad(i + 1)}. ${play.title}`,
      chapter: `Play ${pad(i + 1)} / ${pad(total)}`,
      kind: "play",
      steps: 1,
      Component: () => <PlayScene play={play} n={i + 1} total={total} />,
    })),
    { id: "start-here", label: "Start here", chapter: "05 — Start here", kind: "close", steps: 2, glow: 0.9, Component: Close },
  ];
}

/* ───────────────────────── 00 Intro ───────────────────────── */

function Intro() {
  return (
    <div className="intro">
      <motion.div
        className="letterbox letterbox--top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
      />
      <motion.div
        className="letterbox letterbox--bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
      />
      <div className="intro__mark">
        <Mark size={132} stroke={5} draw delay={0.6} duration={2.2} />
      </div>
      <Reveal delay={1.4} className="mono intro__eyebrow">
        {meta.eyebrow}
      </Reveal>
      <h1 className="intro__title">
        <SplitWords text="The BlackBook" delay={1.6} stagger={0.12} className="intro__line" />
        <span className="intro__line intro__line--green">
          <SplitWords text="Playbook" delay={1.95} />
        </span>
      </h1>
      <Reveal delay={2.6} className="intro__sub">
        Ten plays to make BlackBook <em className="serif">the</em> place to be as a creative.
      </Reveal>
      <motion.p
        className="mono intro__hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.35, 1] }}
        transition={{ delay: 3.4, duration: 2.4, repeat: Infinity, repeatType: "reverse" }}
      >
        Press → or scroll to begin
      </motion.p>
    </div>
  );
}

/* ───────────────────────── 01 The noise ───────────────────────── */

const noiseLayout = (() => {
  const r = seeded(7);
  return moment.noise.map((text, i) => ({
    text,
    left: `${r() * 86}%`,
    top: `${4 + ((i * 97) % 88) + r() * 4}%`,
    size: 0.75 + r() * 0.9,
    dur: 14 + r() * 18,
    drift: (r() > 0.5 ? 1 : -1) * (40 + r() * 80),
    delay: r() * -20,
    struck: r() > 0.72,
  }));
})();

function Noise({ step }: { step: number }) {
  return (
    <div className="noise">
      <div className="noise__field" aria-hidden>
        {noiseLayout.map((n, i) => (
          <motion.span
            key={i}
            className={`noise__word ${n.struck ? "is-struck" : ""}`}
            style={{ left: n.left, top: n.top, fontSize: `${n.size}rem` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0.3, 0.6, 0.2], x: [0, n.drift] }}
            transition={{
              opacity: { duration: 6, repeat: Infinity, repeatType: "mirror", delay: i * 0.12 },
              x: { duration: n.dur, repeat: Infinity, repeatType: "mirror", ease: "linear" },
            }}
          >
            {n.text}
          </motion.span>
        ))}
      </div>
      <div className="noise__copy">
        <Reveal className="mono label">Right now</Reveal>
        <h2 className="noise__opener">
          <SplitWords text={moment.opener} delay={0.3} />
        </h2>
        <div className="noise__lines">
          {moment.lines.map((l, i) => (
            <Step key={l} show={step >= i + 1} className={`noise__line ${step > i + 1 ? "is-past" : ""}`}>
              {l}
            </Step>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Insight ───────────────────────── */

function Insight() {
  return (
    <div className="center-stack insight">
      <Reveal className="mono label" delay={0.4}>
        {insight.label}
      </Reveal>
      <h2 className="insight__line">
        <SplitWords text={insight.pre} delay={0.7} stagger={0.1} />{" "}
        <span className="serif green insight__em">
          <SplitWords text={insight.em} delay={1.1} stagger={0.14} />
        </span>
        <br />
        <SplitWords text={insight.post} delay={1.6} stagger={0.1} className="dimmer" />
      </h2>
      <motion.div
        className="pulse-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.2, duration: 1.6, ease: EASE }}
      />
    </div>
  );
}

/* ───────────────────────── Position ───────────────────────── */

function Position({ step }: { step: number }) {
  return (
    <div className="position">
      <Reveal className="mono label">{position.label}</Reveal>
      <h2 className="display">
        <SplitWords
          text={position.line}
          delay={0.35}
          wordClassName={(w) => (/artists|creators/.test(w) ? "green" : undefined)}
        />
      </h2>
      <Step show={step >= 1} className="position__sub">
        {position.sub}
      </Step>
    </div>
  );
}

/* ───────────────────────── FOMO ───────────────────────── */

function Fomo({ step }: { step: number }) {
  return (
    <div className="fomo">
      <div className="fomo__head">
        <Reveal className="mono label">{strategy.label}</Reveal>
        <h2 className="fomo__headline">
          <SplitWords text={strategy.headline} delay={0.3} stagger={0.14} />
        </h2>
        <Reveal delay={0.9} className="fomo__sub">
          {strategy.sub}
        </Reveal>
      </div>
      <ul className="fomo__lines">
        {strategy.lines.map((l, i) => (
          <Step key={l} show={step >= i + 1} className="fomo__line" y={50}>
            <span className="fomo__best">{l}</span>{" "}
            <span className="fomo__tail serif">{strategy.tail}</span>
          </Step>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── Feeling ───────────────────────── */

function Feeling({ step }: { step: number }) {
  return (
    <div className="center-stack feeling">
      <Reveal className="mono label" delay={0.3}>
        {feeling.label}
      </Reveal>
      <blockquote className="feeling__quote">
        <span className="serif feeling__a">
          <SplitWords text={feeling.a} delay={0.5} stagger={0.08} />
        </span>
        <Step show={step >= 1} className="feeling__b" y={40}>
          {feeling.b}
        </Step>
      </blockquote>
    </div>
  );
}

/* ───────────────────────── Loop ───────────────────────── */

function Loop({ step }: { step: number }) {
  return (
    <div className="loop">
      <div className="loop__head">
        <Reveal className="mono label">{loop.label}</Reveal>
        <h2 className="display display--md">
          <SplitWords text={loop.headline} delay={0.3} />
        </h2>
      </div>
      <div className="loop__track">
        {loop.steps.map((s, i) => (
          <Step key={s.k} show={step >= i} className="loop__node" delay={i === 0 ? 0.8 : 0}>
            <div className="loop__index mono">
              <span className="green">{pad(i + 1)}</span> {s.k}
            </div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
            {i < loop.steps.length - 1 && (
              <motion.span
                className="loop__arrow"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step > i ? 1 : 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            )}
          </Step>
        ))}
      </div>
      <div className="loop__return">
        <svg viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden>
          <motion.path
            d="M 833 6 C 833 80, 813 84, 700 84 L 300 84 C 187 84, 167 80, 167 6"
            fill="none"
            stroke="var(--green)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="4 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: step >= loop.steps.length ? 1 : 0 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </svg>
        <Step show={step >= loop.steps.length} className="loop__back" delay={0.6}>
          <span className="serif">{loop.back}</span>
        </Step>
      </div>
    </div>
  );
}

/* ───────────────────────── Index ───────────────────────── */

function PlaybookIndex({ nav }: SceneProps) {
  return (
    <div className="pb-index">
      <div className="pb-index__head">
        <Reveal className="mono label">The Playbook</Reveal>
        <h2 className="display display--md">
          <SplitWords text={`${plays.length} plays.`} delay={0.2} />{" "}
          <span className="serif green">
            <SplitWords text="One place to be." delay={0.45} />
          </span>
        </h2>
      </div>
      <ol className="pb-index__grid">
        {plays.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.6 + i * 0.07, duration: 0.9, ease: EASE }}
          >
            <button className="pb-card" onClick={() => nav.goTo(p.id)}>
              <span className="pb-card__n mono">{pad(i + 1)}</span>
              <span className="pb-card__t">{p.title}</span>
              <span className="pb-card__k mono">{p.kicker}</span>
              <span className="pb-card__go" aria-hidden>
                ↗
              </span>
            </button>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ───────────────────────── Close ───────────────────────── */

function Close({ step }: { step: number }) {
  return (
    <div className="close">
      <div className="close__mark">
        <Mark size={220} stroke={4} draw delay={0.3} duration={2.6} />
      </div>
      <h2 className="close__a">
        <SplitWords text={close.a} delay={0.6} stagger={0.14} />
      </h2>
      <Step show={step >= 1} className="close__b serif green" y={40}>
        {close.b}
      </Step>
      <Step show={step >= 1} className="close__foot mono" delay={0.5}>
        <span>{meta.title}</span>
        <span className="dim">Prepared for {meta.client}</span>
        {meta.preparedBy && <span className="dim">{meta.preparedBy}</span>}
      </Step>
    </div>
  );
}
