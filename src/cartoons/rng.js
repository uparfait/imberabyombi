/* cartoons/rng.js: a seeded random source, so a seed always draws the same cartoon. rng('about-a') returns r():
   r() a number in [0, 1), r.range(a, b), r.int(a, b) (both ends included), r.pick(list), r.chance(p). */
export function rng(seed) {
  let h = 2166136261;
  for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
