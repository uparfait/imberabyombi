/* charts/registry.js: the canvas bar chart (drawChart) and its registry. CHARTS remembers what each canvas shows, so
   redraw_charts() draws them all again (sidebar resize, theme or brand change). The router empties it before every draw. */
import { css_var, rem } from '../lib/index.js';

/* Canvas bar chart: reads colours from tokens, so it follows theme + brand changes */
export const CHARTS = new Map();
export function draw_chart(cv, labels, vals, anim = true) {
  if (!cv) return; CHARTS.set(cv.id, [labels, vals]);
  const dpr = devicePixelRatio || 1, wd = cv.clientWidth, ht = cv.clientHeight; if (!wd || !ht) return;
  cv.width = wd * dpr; cv.height = ht * dpr; const x = cv.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
  const col = v => `rgb(${css_var(v)})`, fs = rem() * .72, max = Math.max(...vals, 1) * 1.15, pl = fs * 2.6, pb = fs * 2.2, cw = (wd - pl) / vals.length, bw = Math.min(cw * .5, 38);
  let t = anim && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1;
  const step = () => {
    t = Math.min(1, t + .05); const e = 1 - Math.pow(1 - t, 3);
    x.clearRect(0, 0, wd, ht); x.font = `500 ${fs}px ${getComputedStyle(document.body).fontFamily}`; x.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = Math.round((ht - pb) * i / 4) + .5; x.strokeStyle = col('--line'); x.beginPath(); x.moveTo(pl, y); x.lineTo(wd, y); x.stroke();
      x.fillStyle = col('--muted'); x.textAlign = 'left'; x.fillText(Math.round(max * (1 - i / 4)), 0, y + fs * .35);
    }
    vals.forEach((v, i) => {
      const h = (ht - pb) * (v / max) * e, bx = pl + cw * i + (cw - bw) / 2, by = ht - pb - h, g = x.createLinearGradient(0, by, 0, ht - pb);
      g.addColorStop(0, col('--brand')); g.addColorStop(1, col('--brand_2')); x.fillStyle = g; x.beginPath();
      x.roundRect ? x.roundRect(bx, by, bw, h, [8, 8, 2, 2]) : x.rect(bx, by, bw, h); x.fill();
      x.fillStyle = col('--muted'); x.textAlign = 'center'; x.fillText(labels[i], bx + bw / 2, ht - fs * .4);
    });
    if (t < 1) requestAnimationFrame(step);
