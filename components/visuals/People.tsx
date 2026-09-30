"use client";

import { AnimatePresence, motion } from "motion/react";
import { ConceptTag, EASE, Mark, useTick } from "../primitives";

const creatives = [
  {
    handle: "ama.frames",
    name: "Ama",
    role: "Filmmaker",
    next: "a short film about London's night buses",
    wants: "a cinematographer",
    art: "radial-gradient(circle at 30% 30%, #ffb86b 0 18%, transparent 19%), linear-gradient(160deg, #1b2a4a 0%, #0e1424 55%, #ff7a45 140%)",
  },
  {
    handle: "theo.clay",
    name: "Theo",
    role: "Ceramicist",
    next: "tableware for a pop-up supper club",
    wants: "a food photographer",
    art: "radial-gradient(ellipse at 50% 70%, #e9dcc9 0 22%, transparent 23%), radial-gradient(ellipse at 50% 64%, #3a2c22 0 30%, transparent 31%), linear-gradient(180deg, #c7b39a, #8a6f55)",
  },
  {
    handle: "noor.sound",
    name: "Noor",
    role: "Producer",
    next: "her debut EP",
    wants: "a visual artist for the cover",
    art: "repeating-radial-gradient(circle at 50% 50%, #b4fd95 0 2px, transparent 3px 16px), linear-gradient(135deg, #10210c, #050805)",
  },
];

export function PeopleVisual() {
  const i = useTick(4200, creatives.length);
  const c = creatives[i];
  return (
    <div className="vis people">
      <ConceptTag />
      <div className="post">
        <div className="post__head">
          <span className="avatars">
            <span className="avatar avatar--bb">
              <Mark size={16} stroke={14} />
            </span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={c.handle}
                className="avatar"
                style={{ background: c.art }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </AnimatePresence>
          </span>
          <span className="post__who">
            <span>
              <b>blackbook</b> and <b>{c.handle}</b>
            </span>
            <span className="mono dim">Collab post</span>
          </span>
        </div>

        <div className="post__media">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={c.handle}
              className="post__art"
              style={{ background: c.art }}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </AnimatePresence>
          <div className="post__overlay">
            <span className="mono">The people you should know · Ep. {String(i + 1).padStart(2, "0")}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={c.name}
                className="post__name"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {c.name}, {c.role}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="post__actions" aria-hidden>
          <motion.svg key={`h${i}`} viewBox="0 0 24 24" initial={{ scale: 1 }} animate={{ scale: [1, 1.35, 1] }} transition={{ delay: 1.2, duration: 0.5 }}>
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 5 6.4 5c2 0 3.5 1.1 4.1 2.4h3C14.1 6.1 15.6 5 17.6 5 21 5 23.1 8.5 21.6 11.8 19.5 16.4 12 21 12 21z" fill="#b4fd95" />
          </motion.svg>
          <svg viewBox="0 0 24 24"><path d="M4 4h16v12H8l-4 4z" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          <svg viewBox="0 0 24 24"><path d="M3 11l18-8-8 18-2-8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={c.handle}
            className="post__caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <b>Making next:</b> {c.next}. <b>Looking for:</b> {c.wants}.{" "}
            <span className="green">Find {c.name} on BlackBook ↗</span>
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="dots" aria-hidden>
        {creatives.map((_, k) => (
          <span key={k} className={k === i ? "is-on" : ""} />
        ))}
      </div>
    </div>
  );
}
