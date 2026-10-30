/* overlays/tip.js: G. TOOLTIPS in the shared #tip (plain JS, outside React). The pointer / focus / scroll listeners that
   show and hide it live in behaviors; every draw starts with it hidden. */
import { before_render } from '../store/index.js';

/* G. TOOLTIPS (Imberabyombi style): icon buttons (from aria-label), [data-tip], and trimmed .truncate / .trunc text (only when cut) */
export const TIPS = '[data-tip], .icon_btn[aria-label], .truncate, .trunc';
export const tip = {
  el: document.getElementById('tip'), on: null, t: 0, t2: 0,
  text(x) { return x.matches('.truncate, .trunc') ? (x.scrollWidth > x.clientWidth + 1 ? x.textContent.trim() : '') : x.dataset.tip || x.getAttribute('aria-label') || ''; },
