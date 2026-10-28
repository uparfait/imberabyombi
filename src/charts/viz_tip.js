/* charts/viz_tip.js: the chart tooltip (#viz_tip in index.html, outside React): value first, then the series; a short line key
   in the series colour. Built with textContent. The behaviors' pointer listener calls show() for any [data-tt] mark;
   the router's before_page() hides it before every draw. */
import { scale_color } from './viz_math.js';

export const viz_tip = { el: null, cur: null,
  show(t, x, y) { const el = this.el || (this.el = document.getElementById('viz_tip')); if (!el) return;
    if (this.cur !== t) { this.cur = t; let d; try { d = JSON.parse(t.dataset.tt); } catch { return; } el.replaceChildren();
      const h = document.createElement('p'); h.className = 'viz_tip_title'; h.textContent = d[0]; el.append(h);
