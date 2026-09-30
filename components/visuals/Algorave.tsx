"use client";

import { useEffect, useRef, useState } from "react";
import { ConceptTag } from "../primitives";

const CODE = [
  "// futuretense x ALGORITHM, sponsored by blackbook",
  "setcps(124/60/4)",
  "",
  'd1 $ sound "bd*4" # gain 1.1',
  'd2 $ every 3 (fast 2) $ sound "hh*8"',
  'd3 $ n "0 3 7 <10 12>" # s "superpiano"',
  'd4 $ sound "~ cp" # room 0.4',
  'd5 $ slow 2 $ s "arpy*4" # speed "<1 1.5 2>"',
  "",
  "-- queen elizabeth hall, live",
  "-- the code is the instrument",
];
const FULL = CODE.join("\n");

function highlight(line: string) {
  if (line.startsWith("//") || line.startsWith("--")) return <span className="tok-c">{line}</span>;
  const parts = line.split(/("[^"]*"?)/g);
  return parts.map((p, i) =>
    p.startsWith('"') ? (
      <span key={i} className="tok-s">
        {p}
      </span>
    ) : (
      <span key={i}>
        {p.split(/(\bd\d\b|\$|#)/g).map((q, j) =>
          /^(d\d|\$|#)$/.test(q) ? (
            <span key={j} className="tok-k">
              {q}
            </span>
          ) : (
            q
          ),
        )}
      </span>
    ),
  );
}

export function AlgoraveVisual() {
  const [n, setN] = useState(0);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= FULL.length + 60 ? 0 : v + 1)), 38);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const beat = 60000 / 124;
    const loop = (t: number) => {
      const phase = (t % beat) / beat;
      const kick = Math.pow(1 - phase, 3);
      bars.current.forEach((b, i) => {
        if (!b) return;
        const lowBias = Math.max(0, 1 - i / 14);
        const v =
          0.08 +
          kick * lowBias * 0.85 +
          Math.abs(Math.sin(t / 140 + i * 0.9)) * 0.35 * (0.4 + (i % 5) / 8) +
          Math.random() * 0.06;
        b.style.transform = `scaleY(${Math.min(1, v)})`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const shown = FULL.slice(0, n).split("\n");

  return (
    <div className="vis algorave">
      <ConceptTag />
      <div className="algo__poster">
        <span className="mono">Futuretense ×</span>
        <span className="algo__title">ALGORITHM</span>
        <span className="mono dim">An algorave · Queen Elizabeth Hall · Southbank Centre</span>
        <span className="algo__sponsor mono">Main sponsor <b>BlackBook</b></span>
      </div>

      <div className="terminal">
        <div className="terminal__bar">
          <i />
          <i />
          <i />
          <span className="mono dim">algorave.live</span>
          <span className="mono green terminal__bpm">● 124 BPM</span>
        </div>
        <pre className="terminal__code mono">
          {shown.map((l, i) => (
            <div key={i}>
              <span className="ln">{String(i + 1).padStart(2, " ")}</span>
              {highlight(l)}
              {i === shown.length - 1 && <span className="caret caret--block" />}
            </div>
          ))}
        </pre>
      </div>

      <div className="eq" aria-hidden>
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} ref={(el) => void (bars.current[i] = el)} />
        ))}
      </div>
    </div>
  );
}
