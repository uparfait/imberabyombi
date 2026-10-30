/* overlays/tip.js: G. TOOLTIPS in the shared #tip (plain JS, outside React). The pointer / focus / scroll listeners that
   show and hide it live in behaviors; every draw starts with it hidden. */
import { before_render } from '../store/index.js';

/* G. TOOLTIPS (Imberabyombi style): icon buttons (from aria-label), [data-tip], and trimmed .truncate / .trunc / line-clamp-N
   text (only when cut) */
export const TIPS = '[data-tip], .icon_btn[aria-label], .truncate, .trunc, [class*=line-clamp-]';
export const tip = {
  el: document.getElementById('tip'), on: null, t: 0, t2: 0,
  text(x) { return x.matches('.truncate, .trunc') ? (x.scrollWidth > x.clientWidth + 1 ? x.textContent.trim() : '') : x.dataset.tip || x.getAttribute('aria-label') || ''; },
  find(n) { for (let x = n?.closest?.(TIPS); x; x = x.parentElement?.closest(TIPS)) if (this.text(x)) return x; return null; },
  /* intro: shown at once, fading and rising in slowly (help_intro below) */
  show(x, intro = false) {
    if (x === this.on) return; this.hide(); this.on = x;
    this.t = setTimeout(() => {
      const el = this.el, s = x.isConnected && this.on === x ? this.text(x) : ''; if (!s) return;
      el.textContent = s; (x.closest('dialog[open]') || document.body).append(el); el.classList.toggle('intro', intro);
      const r = x.getBoundingClientRect(), w = el.offsetWidth, h = el.offsetHeight, top = r.bottom + 6 + h > innerHeight - 4 ? r.top - h - 6 : r.bottom + 6;
      el.style.left = Math.max(4, Math.min(r.left + r.width / 2 - w / 2, innerWidth - w - 4)) + 'px'; el.style.top = Math.max(4, top) + 'px';
      intro ? requestAnimationFrame(() => requestAnimationFrame(() => this.on === x && el.classList.add('on'))) : el.classList.add('on');
    }, intro ? 0 : 450);
  },
  hide() { clearTimeout(this.t); clearTimeout(this.t2); this.on = null; this.el?.classList.remove('on'); }
};
before_render(() => tip.hide());

/* The first help icon (help_tip) of a page or a dialog introduces itself the first time it shows after a load: it zooms
   in and out twice, then its text shows for a few seconds and fades away. Each text does this once per load; hovering
   the icon keeps the text up. help_intro(root) looks in root (default: the page, without its headers, the admin sidebar
   and side panel, and dialogs) and tries a few times, so pages and dialogs that load their content later are caught too. */
const SEEN = new Set(), still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let run = 0;
const first_help = root => [...root.querySelectorAll('.help_tip')]
  .find(x => (root.tagName === 'DIALOG' || !x.closest('header, #sidebar, #side_panel, dialog')) && x.getClientRects().length);
/* the icon is on screen and not covered (scrolled away, or under the sticky header) */
const seen_now = x => { const r = x.getBoundingClientRect(), hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  return !!hit && x.contains(hit); };
function intro(x) {
  SEEN.add(tip.text(x)); if (!seen_now(x)) return;
  x.classList.add('intro');
  setTimeout(() => {
    x.classList.remove('intro');
    if (!x.isConnected || (tip.on && tip.on !== x) || !seen_now(x)) return;   /* scrolled away meanwhile: no text */
    tip.show(x, true);
    tip.t2 = setTimeout(() => { if (tip.on === x && !x.matches(':hover, :focus-visible')) tip.hide(); }, 3800);
  }, still() ? 0 : 1400);
}
export function help_intro(root) {
  const id = ++run;
  [500, 1200, 2600].forEach(ms => setTimeout(() => {
    if (id !== run) return;
    const r = root || document.getElementById('app'), x = r && first_help(r);
    if (!x) return; run++;
    if (!SEEN.has(tip.text(x))) intro(x);
  }, ms));
}
/* a dialog's help icon: when a dialog opens */
new MutationObserver(ms => ms.forEach(m => m.target.tagName === 'DIALOG' && m.target.open && help_intro(m.target)))
  .observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
