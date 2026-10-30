/* overlays/tip.js: G. TOOLTIPS in the shared #tip (plain JS, outside React). The pointer / focus / scroll listeners that
   show and hide it live in behaviors; every draw starts with it hidden. */
import { before_render } from '../store/index.js';

/* G. TOOLTIPS (Imberabyombi style): icon buttons (from aria-label), [data-tip], and trimmed .truncate / .trunc text (only when cut) */
export const TIPS = '[data-tip], .icon_btn[aria-label], .truncate, .trunc';
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
