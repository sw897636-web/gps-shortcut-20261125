// The GPS Swears It Was a Shortcut — make.fun entry.
// Writes exactly one GPS excuse (<=200 chars, pure ASCII) to entry.txt.
//
// Candidate lines, drafted and weighed against the judge brief:
//   GPS voice first, then the joke, then the turn, then the freshness.
//   - A: lake second look — smug, but the punch is soft and the lake
//     does no work after the setup.
//   - B: blaming the map — on-brief and defensive, but "I am only the
//     voice in the box" explains the joke instead of landing it.
//   - C: gas station attendant knows your name — good specific detail,
//     but "Recalculating" is the exact cliche the brief warns against.
//   - D: wedding, cul-de-sac, own driveway twice — three concrete
//     details stacking up, smug denial up front, punch at the tail.
//   - E: scenic route, cul-de-sac surprise — decent, but "surprise to
//     both of us" lets the GPS off the hook instead of blaming the map.
//   - G: dead end, gas station, ask directions — relatable, but the
//     punch ("ask for directions") is the driver's line, not the GPS's.
// D wins: the denial ("not a wrong turn") is pure GPS, the details are
// specific and escalate, and "your own driveway twice" is the turn the
// reader does not see coming — you ended up where you started.
//
// Revision 2: tightened D by dropping "happens to" — "it just goes past"
// lands faster and shorter. Added candidate G, a dead-end
// gas station line, weighed and rejected: the punch explains itself
// instead of surprising. D stays the pick.
// Revision 3: comma before "twice" — a beat before the punch, and it
// brings the line to exactly 120 chars, inside the 120-180 target band.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CANDIDATES: string[] = [
  "I did not get you lost, I was giving the lake a second look, and honestly, it looked better from the wrong side of it.",
  "The map said turn left, the road said otherwise, and since I am only the voice in the box, I am blaming the map.",
  "Recalculating is my way of saying I had no idea either, but the gas station attendant knew your name by now, so it worked out.",
  "That was not a wrong turn, that was a shortcut, it just goes past a wedding, a cul-de-sac, and your own driveway, twice.",
  "I took the scenic route because the highway was boring, and the cul-de-sac at the end was a surprise to both of us.",
  "The satellite lost me for a second, so I guessed, and my guess had a lake in it, which I am choosing to call a shortcut.",
  "That dead end had a gas station, a pay phone, and a man who gave directions, so technically I got you help, not lost.",
];

// The pick: D — denial, three escalating details, punch at the tail.
// Revision 2: "it just happens to go past" tightened to "it just goes past".
const ENTRY = CANDIDATES[3];

// Self-check against the sealed gate: 1-200 chars, one line, not blank,
// pure ASCII (the gate counts UTF-8 bytes; an em dash would cost 3).
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, outside 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("entry must be exactly one non-blank line");
}
if (!/^[\x00-\x7F]*$/.test(ENTRY)) {
  throw new Error("entry must be pure ASCII");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
console.log(ENTRY);
