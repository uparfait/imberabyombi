/* table/table_full.js: Full screen (right of the table tools): the table grows from its place to fill the tab (not the
   browser's fullscreen) and shrinks back into it. While full, a placeholder (.table_ph) keeps the card's place in the page. */
import { qs } from '../lib/index.js';
import { ui, rerender, before_render } from '../store/index.js';
import { reduced } from '../feedback/index.js';
import { tip } from '../overlays/index.js';
import { close_pops } from '../actions/index.js';

const PH = {};   /* collection → the card's height when it went full screen (the placeholder's height) */
before_render(keep => { if (!keep) for (const c in PH) delete PH[c]; });
export const ph_height = c => PH[c] ? `${PH[c]}px` : '24rem';

/* on: true = open, false = close, undefined = toggle. The card, its button and the placeholder redraw from ui.table_full. */
export function table_full(c, on) {
  const card = qs(`#table_card_${c}`); if (!card) return; on ??= !card.classList.contains('table_full');
  const set = v => { ui.table_full = v ? c : null; if (!v) delete PH[c]; rerender(); };
  const box = r => `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 1.5rem)`, ease = 'cubic-bezier(.22,.8,.22,1)';
  tip.hide(); close_pops();
  if (on) {
    qs('#main')?.classList.remove('page_enter'); const r = card.getBoundingClientRect(); PH[c] = r.height; set(true);
    if (!reduced()) qs(`#table_card_${c}`)?.animate([{ clipPath: box(r) }, { clipPath: 'inset(0 0 0 0 round 0)' }], { duration: 320, easing: ease });
    return;
  }
  const ph = card.previousElementSibling?.classList.contains('table_ph') ? card.previousElementSibling : null, done = () => set(false);
  if (reduced() || !ph) return done();
  card.animate([{ clipPath: 'inset(0 0 0 0 round 0)' }, { clipPath: box(ph.getBoundingClientRect()) }], { duration: 260, easing: ease }).finished.then(done);
}
