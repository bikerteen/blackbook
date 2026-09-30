"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ConceptTag, EASE } from "../primitives";

export function CreditVisual() {
  const [shots, setShots] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const fire = () => {
      setFlash(true);
      setShots((s) => s + 1);
      setTimeout(() => setFlash(false), 180);
    };
    const first = setTimeout(fire, 1600);
    const id = setInterval(fire, 3800);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const published = shots > 0;

  return (
    <div className="vis credit">
      <ConceptTag />
      <div className="viewfinder">
        <div className="stage" aria-hidden>
          <motion.span
            className="beam beam--a"
            animate={{ rotate: [-18, 10, -18] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="beam beam--b"
            animate={{ rotate: [16, -12, 16] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="stage__performer" />
          <svg className="crowd" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path
              d="M0 80 L0 50 Q10 30 22 48 Q30 26 44 46 Q56 22 70 44 Q80 30 94 48 Q108 20 122 46 Q134 28 148 44 Q160 18 176 46 Q188 30 200 48 Q214 22 228 44 Q240 30 254 46 Q268 20 282 46 Q294 28 308 44 Q320 24 336 46 Q348 30 360 48 Q374 22 388 46 L400 40 L400 80 Z"
              fill="#060606"
            />
          </svg>
        </div>

        <div className="vf-hud mono" aria-hidden>
          <span>RAW</span>
          <span>ISO 3200</span>
          <span>1/250</span>
          <span>f/1.8</span>
          <span className="vf-hud__count">{String(246 + shots).padStart(4, "0")}</span>
        </div>
        <span className="vf-corner vf-corner--tl" />
        <span className="vf-corner vf-corner--tr" />
        <span className="vf-corner vf-corner--bl" />
        <span className="vf-corner vf-corner--br" />
        <motion.span
          className="vf-focus"
          animate={{ scale: [1.25, 1, 1, 1.25], opacity: [0.4, 1, 1, 0.4] }}
          transition={{ duration: 3.8, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 0.2 }}
        />
        <AnimatePresence>
          {flash && (
            <motion.span
              className="vf-flash"
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
            />
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="credit-line"
        initial={{ opacity: 0, y: 30 }}
        animate={published ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      >
        <span className="credit-line__cap">
          <span className="mono dim">Photo</span> <b>Your Name</b>{" "}
          <span className="mono green">Official photographer via BlackBook</span>
        </span>
        <span className="credit-line__chips mono">
          {["Paid", "Usage terms agreed upfront", "Credited on publish"].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={published ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.5, ease: EASE }}
            >
              ✓ {t}
            </motion.span>
          ))}
        </span>
      </motion.div>
    </div>
  );
}
