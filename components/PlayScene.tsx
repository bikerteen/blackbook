"use client";

import { motion } from "motion/react";
import type { Play } from "@/content/playbook";
import { EASE, Reveal, SplitWords } from "./primitives";
import { Visual } from "./visuals";

const pad = (n: number) => String(n).padStart(2, "0");

export function PlayScene({ play, n, total }: { play: Play; n: number; total: number }) {
  return (
    <article className="play">
      <motion.div
        className="play__bignum"
        aria-hidden
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
      >
        {pad(n)}
      </motion.div>

      <div className={`play__text ${play.callout ? "has-callout" : ""}`}>
        <Reveal className="play__meta mono" delay={0.3}>
          <span className="green">
            Play {pad(n)} / {pad(total)}
          </span>
          <span className="dim">{play.kicker}</span>
        </Reveal>
        <h2 className="play__title">
          <SplitWords text={play.title} delay={0.45} stagger={0.045} />
        </h2>
        <Reveal className="play__body" delay={0.9}>
          {play.body}
        </Reveal>
        <Reveal className="play__hook serif" delay={1.1}>
          {play.hook}
        </Reveal>
        {play.callout && (
          <Reveal className="play__callout" delay={1.25}>
            <span className="mono green">{play.callout.label}</span>
            <p>{play.callout.text}</p>
          </Reveal>
        )}
        <ol className="play__flow">
          {play.flow.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.12, duration: 0.8, ease: EASE }}
            >
              <span className="mono green">{pad(i + 1)}</span>
              <span>{f}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      <motion.div
        className="play__visual"
        initial={{ opacity: 0, scale: 0.94, rotateX: 8, y: 40 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.55 }}
      >
        <Visual kind={play.visual} play={play} n={n} />
      </motion.div>
    </article>
  );
}
