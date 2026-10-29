/* sign/bg_cut.js: background removal for an uploaded signature or stamp. The paper's colour is read from the picture's
   edges (their median, so a little ink at the border does not matter); every pixel close to it becomes transparent, and a
   soft band after that keeps the ink's edges smooth. amount (0–100): how far from the paper a colour may be and still go.
   A picture whose edges are already transparent is left as it is. */
const MAX = 1400;   /* the longest side kept: plenty for a signature or a stamp, and each change of the slider stays quick */

const median = a => a.sort((x, y) => x - y)[a.length >> 1];
/* the median red, green, blue and alpha of the edge pixels */
function edges(d, w, h) {
  const c = [[], [], [], []], add = i => { for (let k = 0; k < 4; k++) c[k].push(d[i + k]); };
  for (let x = 0; x < w; x += 2) { add(x * 4); add(((h - 1) * w + x) * 4); }
  for (let y = 0; y < h; y += 2) { add(y * w * 4); add((y * w + w - 1) * 4); }
