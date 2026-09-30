"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ConceptTag, EASE, Mark } from "../primitives";

type Msg =
  | { who: "me"; text: string; attach?: string }
  | { who: "bb"; kind: "typing" }
  | { who: "bb"; kind: "people" }
  | { who: "bb"; kind: "opportunity" };

// [message, ms to wait after showing it]
const script: [Msg, number][] = [
  [{ who: "me", text: "Who could direct this?", attach: "treatment_v3.pdf" }, 900],
  [{ who: "bb", kind: "typing" }, 1300],
  [{ who: "bb", kind: "people" }, 2600],
  [{ who: "me", text: "Find opportunities that fit my music" }, 900],
  [{ who: "bb", kind: "typing" }, 1300],
  [{ who: "bb", kind: "opportunity" }, 5200],
];

const directors = [
  { n: "Sade O.", why: "2 music videos in the same moody, handheld tone" },
  { n: "Marco L.", why: "Blends stop-motion with live action" },
  { n: "Hana K.", why: "Looking for her next narrative project" },
];

function useScript() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const wait = n === 0 ? 700 : script[n - 1][1];
    const t = setTimeout(() => setN((v) => (v >= script.length ? 0 : v + 1)), wait);
    return () => clearTimeout(t);
  }, [n]);
  // A typing bubble disappears once the next message arrives.
  return script
    .slice(0, n)
    .map(([m], i) => ({ m, i }))
    .filter(({ m, i }) => !(m.who === "bb" && m.kind === "typing" && i < n - 1));
}

export function BBVisual() {
  const msgs = useScript();
  return (
    <div className="vis bb">
      <ConceptTag />
      <div className="bb__head">
        <span className="bb__avatar">
          <Mark size={20} stroke={14} />
        </span>
        <span className="bb__id">
          <b>BB</b>
          <span className="mono green">● In your corner</span>
        </span>
      </div>

      <div className="bb__thread">
        <AnimatePresence initial={false}>
          {msgs.map(({ m, i }) => (
            <motion.div
              key={i}
              layout
              className={`bubble bubble--${m.who}`}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {m.who === "me" && (
                <>
                  {m.attach && <span className="bubble__attach mono">📎 {m.attach}</span>}
                  {m.text}
                </>
              )}
              {m.who === "bb" && m.kind === "typing" && (
                <span className="typing">
                  <i />
                  <i />
                  <i />
                </span>
              )}
              {m.who === "bb" && m.kind === "people" && (
                <div className="bb-people">
                  <span>Three directors on BlackBook who fit your treatment:</span>
                  {directors.map((d, k) => (
                    <motion.span
                      key={d.n}
                      className="bb-person"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + k * 0.15 }}
                    >
                      <span className="bb-person__dot" />
                      <span>
                        <b>{d.n}</b> <span className="dim">{d.why}</span>
                      </span>
                    </motion.span>
                  ))}
                </div>
              )}
              {m.who === "bb" && m.kind === "opportunity" && (
                <div className="bb-opp">
                  <span className="mono green">Opportunity</span>
                  <b>Sync brief: indie game soundtrack</b>
                  <span className="bb-opp__grid mono">
                    <span className="dim">Source</span>
                    <span>Studio open call ↗</span>
                    <span className="dim">Deadline</span>
                    <span>14 Oct</span>
                    <span className="dim">Next step</span>
                    <span>Send 2 tracks under 3 min</span>
                  </span>
                  <span className="bb-opp__cta">Draft my application →</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bb__input">
        <span className="dim">Ask BB anything…</span>
        <span className="bb__send">↑</span>
      </div>
    </div>
  );
}
