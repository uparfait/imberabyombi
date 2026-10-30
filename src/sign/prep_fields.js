/* sign/prep_fields.js: adding and removing fields on the draft being prepared. A new field belongs to the signer chosen
   under "Placing for"; it lands where a tool was dropped, or in the middle of the page on screen (a little lower and to the
   right each time, so new fields never hide each other). */
import { uid, qs, qsa } from '../lib/index.js';
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { ask } from '../overlays/index.js';
import { KINDS, rec_of, shown } from './sign_store.js';
import { P, prep_dirty } from './prep_state.js';

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* the page nearest the middle of the screen, and how far down it that middle is (a fraction) */
function on_screen() {
  const mid = innerHeight / 2; let best = { page: 0, y: .3 }, gap = Infinity;
  for (const s of qsa('.sign_sheet')) {
    const b = s.getBoundingClientRect(), d = b.top > mid ? b.top - mid : b.bottom < mid ? mid - b.bottom : 0;
    if (d < gap) { gap = d; best = { page: +s.dataset.page, y: clamp((mid - b.top) / b.height, .12, .88) }; }
  }
  return best;
}

/* type: 'signature' | 'stamp'; page, cx, cy: where (a page index and the centre as fractions), or nothing for "on screen" */
export function add_field(type, page, cx, cy) {
  if (!P.rid) { notify('Add a signer first, then place their fields.', 'warn', 'Who signs here?'); P.adding = true; rerender(); return; }
  if (page == null) { const s = on_screen(), k = P.doc.fields.length % 4; page = s.page; cy = s.y + k * .02; cx = .5 + k * .03; }
  const [, , pw, ph] = KINDS[type], sz = P.doc.pages[page], w = Math.min(pw / sz.w, .9), h = Math.min(ph / sz.h, .9);
  const f = { id: uid(), type, rid: P.rid, page, w, h, x: clamp(cx - w / 2, 0, 1 - w), y: clamp(cy - h / 2, 0, 1 - h) };
  P.doc.fields.push(f); P.sel = f.id; prep_dirty(); rerender();
  qs(`[data-fid="${f.id}"]`)?.classList.add('sf_new');
}

/* removing a field (its × or the Delete key) asks first */
export function del_field(id) {
  const f = P.doc.fields.find(x => x.id === id); if (!f) return;
  const [l] = KINDS[f.type], r = rec_of(P.doc, f.rid);
  ask(`Remove this ${l.toLowerCase()} field${r ? ` for ${r.name}` : ''}? They will not ${f.type === 'stamp' ? 'stamp' : 'sign'} here.`, () => {
    P.doc.fields = P.doc.fields.filter(x => x.id !== id); if (P.sel === id) P.sel = null;
    prep_dirty(); rerender(); }, 'Remove', true);
}
