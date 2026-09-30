"use client";

import { AnimatePresence, motion } from "motion/react";
import { ConceptTag, EASE, useTick } from "../primitives";

type Person = { name: string; makes: string; needs: string; offers: string };

const left: Person[] = [
  { name: "Jo", makes: "Music videos", needs: "A composer", offers: "Editing" },
  { name: "Kai", makes: "Streetwear", needs: "A photographer", offers: "Styling" },
  { name: "Mira", makes: "Short fiction", needs: "An illustrator", offers: "Scriptwriting" },
];
const right: Person[] = [
  { name: "Leo", makes: "Portraits", needs: "Styling for a series", offers: "Lookbook shoots" },
  { name: "Ren", makes: "Illustration", needs: "A story to draw", offers: "Character design" },
  { name: "Sol", makes: "Film scores", needs: "Visuals for a live set", offers: "Sound design" },
];
// left index → right index, plus what they could build together
const pairs = [
  { l: 0, r: 2, project: "A live AV show" },
  { l: 1, r: 0, project: "A lookbook drop" },
  { l: 2, r: 1, project: "A graphic novella" },
];
const rowY = [17, 50, 83];

function Card({ p, lit, side }: { p: Person; lit: boolean; side: "l" | "r" }) {
  return (
    <motion.div
      className={`m-card m-card--${side} ${lit ? "is-lit" : ""}`}
      animate={{ opacity: lit ? 1 : 0.45, scale: lit ? 1.03 : 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <span className="m-card__name">{p.name}</span>
      <span className="m-card__row">
        <span className="mono dim">Makes</span> {p.makes}
      </span>
      <span className="m-card__row">
        <span className="mono dim">Needs</span> {p.needs}
      </span>
      <span className="m-card__row">
        <span className="mono dim">Offers</span> {p.offers}
      </span>
    </motion.div>
  );
}

export function MatchVisual() {
  const k = useTick(3000, pairs.length);
  const pair = pairs[k];
  const y1 = rowY[pair.l];
  const y2 = rowY[pair.r];
  const mid = (y1 + y2) / 2;

  return (
    <div className="vis match">
      <ConceptTag />
      <div className="match__head mono">
        <span className="dim">Applications</span>
        <span className="green">Matched by hand</span>
      </div>
      <div className="match__board">
        <div className="match__col">
          {left.map((p, i) => (
            <Card key={p.name} p={p} side="l" lit={pair.l === i} />
          ))}
        </div>
        <div className="match__col">
          {right.map((p, i) => (
            <Card key={p.name} p={p} side="r" lit={pair.r === i} />
          ))}
        </div>

        <svg className="match__wire" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <motion.path
            key={k}
            d={`M 44 ${y1} C 52 ${y1}, 48 ${y2}, 56 ${y2}`}
            fill="none"
            stroke="#b4fd95"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </svg>

        <AnimatePresence mode="wait">
          <motion.div
            key={k}
            className="match__pill"
            style={{ top: `${mid}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
          >
            <span className="mono">Match</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={k}
          className="match__project"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
        >
          <span className="mono dim">They could build</span>
          <span className="match__project-t">{pair.project}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
