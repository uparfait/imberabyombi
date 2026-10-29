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
  return c.map(median);
}

/* the picture into canvas (scaled down when large), with its background made transparent by amount */
export function paint(canvas, img, amount) {
  const k = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * k)), h = Math.max(1, Math.round(img.naturalHeight * k));
  canvas.width = w; canvas.height = h;
  const x = canvas.getContext('2d', { willReadFrequently: true }); x.clearRect(0, 0, w, h); x.drawImage(img, 0, 0, w, h);
  if (!amount) return;
  const im = x.getImageData(0, 0, w, h), d = im.data, [r, g, b, a] = edges(d, w, h); if (a < 128) return;
  const cut = amount * 2.1, soft = 18 + amount * .4;
  for (let i = 0; i < d.length; i += 4) {
    const dr = d[i] - r, dg = d[i + 1] - g, db = d[i + 2] - b, dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist <= cut) d[i + 3] = 0; else if (dist < cut + soft) d[i + 3] = Math.round(d[i + 3] * (dist - cut) / soft);
  }
  x.putImageData(im, 0, 0);
}

/* a picture with solid (not transparent) edges: it most likely has paper around the ink */
export function solid_edges(img) {
