"use client";

import { motion } from "motion/react";
import { ConceptTag, EASE, useTick } from "../primitives";

type Piece = {
  title: string;
  handle: string;
  state: "unseen" | "unfinished";
  needs?: string;
  done?: number;
  art: string;
  area: string;
};

const pieces: Piece[] = [
  {
    title: "Night Swim, 2021",
    handle: "@lola.paints",
    state: "unseen",
    art: "radial-gradient(circle at 70% 25%, #f4e7b8 0 7%, transparent 8%), linear-gradient(180deg, #0f2440 0%, #13365c 55%, #0b1a2c 56%, #07101c 100%)",
    area: "a",
  },
  {
    title: "The album that never was",
    handle: "@kwame.wav",
    state: "unfinished",
    needs: "a mixing engineer",
    done: 70,
    art: "radial-gradient(circle at 50% 50%, #b4fd95 0 9%, #0b0b0b 9.5% 11%, transparent 11.5% 40%, #050505 40.5%), repeating-radial-gradient(circle at 50% 50%, #151515 0 2px, #2c2c2c 2.5px 4px)",
    area: "b",
  },
  {
    title: "Pilot episode, 2022",
    handle: "@jun.draws",
    state: "unfinished",
    needs: "an animator",
    done: 45,
    art: "linear-gradient(135deg, #ff6b6b 0 30%, #ffd166 30% 55%, #06d6a0 55% 80%, #118ab2 80%)",
    area: "c",
  },
  {
    title: "Sketchbook 04",
    handle: "@ines.ink",
    state: "unseen",
    art: "repeating-linear-gradient(45deg, #e9e4da 0 2px, #f5f1ea 2px 10px)",
    area: "d",
  },
  {
    title: "Chair prototype, 2020",
    handle: "@remi.makes",
    state: "unfinished",
    needs: "a fabricator",
    done: 55,
    art: "linear-gradient(90deg, transparent 44%, #c08552 44% 56%, transparent 56%), linear-gradient(0deg, transparent 30%, #c08552 30% 40%, transparent 40%), #2a2118",
    area: "e",
  },
];

export function UnfinishedVisual() {
  const spot = useTick(2600, pieces.length);
  return (
    <div className="vis unfinished">
      <ConceptTag />
      <div className="gallery__head">
        <span className="mono dim">Open call · Exhibition</span>
        <span className="gallery__title">Unfinished Business</span>
      </div>
      <div className="gallery">
        {pieces.map((p, i) => {
          const lit = spot === i;
          return (
            <motion.figure
              key={p.title}
              className={`frame frame--${p.state} ${lit ? "is-lit" : ""}`}
              style={{ gridArea: p.area }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: lit ? 1 : 0.5, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 + i * 0.1 }}
            >
              <div className="frame__art">
                <div
                  className="frame__paint"
                  style={{
                    background: p.art,
                    clipPath: p.done ? `inset(0 ${100 - p.done}% 0 0)` : undefined,
                  }}
                />
                {p.state === "unfinished" && (
                  <span className="frame__todo" style={{ left: `calc(5px + (100% - 10px) * ${p.done! / 100})` }}>
                    <span className="mono">{p.done}%</span>
                  </span>
                )}
              </div>
              <figcaption className="frame__cap">
                <span>{p.title}</span>
                <span className="mono dim">{p.handle} on BlackBook</span>
                {p.needs && <span className="mono green">Needs: {p.needs}</span>}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </div>
  );
}
