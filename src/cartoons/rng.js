/* cartoons/rng.js: a seeded random source, so a seed always draws the same cartoon. rng('about-a') returns r():
   r() a number in [0, 1), r.range(a, b), r.int(a, b) (both ends included), r.pick(list), r.chance(p). */
export function rng(seed) {
  let h = 2166136261;
  for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  let s = h >>> 0;
  const r = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), s | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  r.range = (a, b) => a + r() * (b - a);
  r.int = (a, b) => Math.floor(r.range(a, b + 1));
  r.pick = list => list[Math.floor(r() * list.length)];
