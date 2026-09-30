"use client";

import type { Play, VisualKey } from "@/content/playbook";
import { Mark } from "../primitives";
import { DropVisual } from "./Drop";
import { InterviewVisual } from "./Interview";
import { PeopleVisual } from "./People";
import { CreditVisual } from "./Credit";
import { AlgoraveVisual } from "./Algorave";
import { ShineVisual } from "./Shine";
import { WildcardVisual } from "./Wildcard";
import { MatchVisual } from "./Match";
import { UnfinishedVisual } from "./Unfinished";
import { BBVisual } from "./BB";

const map: Record<Exclude<VisualKey, "default">, () => React.ReactNode> = {
  drop: DropVisual,
  interview: InterviewVisual,
  people: PeopleVisual,
  credit: CreditVisual,
  algorave: AlgoraveVisual,
  shine: ShineVisual,
  wildcard: WildcardVisual,
  match: MatchVisual,
  unfinished: UnfinishedVisual,
  bb: BBVisual,
};

export function Visual({ kind, play, n }: { kind: VisualKey; play: Play; n: number }) {
  if (kind === "default") return <DefaultVisual play={play} n={n} />;
  const V = map[kind];
  return <V />;
}

/** Fallback for new plays that don't have a bespoke visual yet. */
function DefaultVisual({ play, n }: { play: Play; n: number }) {
  return (
    <div className="vis vis--default">
      <Mark size={160} stroke={4} draw duration={2.4} className="green" />
      <span className="mono dim">Play {String(n).padStart(2, "0")}</span>
      <span className="vis-default__t">{play.title}</span>
    </div>
  );
}
