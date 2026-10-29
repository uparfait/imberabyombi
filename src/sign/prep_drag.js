/* sign/prep_drag.js: placing fields by hand on the prepare page. Drag a field to move it, its corner to resize it (a stamp
   stays square); drop a tool (Signature, Stamp) on a page to add one there; a click on a page unselects. The selected field
   moves with the arrow keys (Shift: further) and goes with Delete or Backspace. prep_pointer(root) wires it all and
   returns the function that unwires it. Moves change the field's style at once and its record (P.doc) as they go. */
import { P, prep_dirty } from './prep_state.js';
import { add_field, del_field, clamp } from './prep_fields.js';

const pct = v => `${v * 100}%`;
const show = (el, f) => Object.assign(el.style, { left: pct(f.x), top: pct(f.y), width: pct(f.w), height: pct(f.h) });
const mark_sel = root => root.querySelectorAll('.sf_edit').forEach(e => e.classList.toggle('sel', e.dataset.fid === P.sel));
const field_of = el => P.doc?.fields.find(x => x.id === el?.dataset.fid);

function down(e, root) {
  const el = e.target.closest('.sf_edit');
  if (!el) { if (P.sel && e.target.closest('.sign_sheet')) { P.sel = null; mark_sel(root); } return; }
  if (e.target.closest('[data-act]') || e.button > 0) return;
  e.preventDefault(); el.focus({ preventScroll: true });
  const f = field_of(el), b = el.closest('.sign_sheet').getBoundingClientRect(), ar = b.width / b.height, min = 24 / b.width;
  const rs = !!e.target.closest('.sf_rs'), o = { ...f }, sx = e.clientX, sy = e.clientY;
  P.sel = f.id; mark_sel(root); el.setPointerCapture(e.pointerId); el.classList.add('drag');
  const move = ev => {
    const dx = (ev.clientX - sx) / b.width, dy = (ev.clientY - sy) / b.height;
    if (rs && f.type === 'stamp') { f.w = clamp(o.w + Math.max(dx, dy / ar), min * 2, Math.min(1 - f.x, (1 - f.y) / ar)); f.h = f.w * ar; }
    else if (rs) { f.w = clamp(o.w + dx, min * 3, 1 - f.x); f.h = clamp(o.h + dy, min * ar, 1 - f.y); }
    else { f.x = clamp(o.x + dx, 0, 1 - f.w); f.y = clamp(o.y + dy, 0, 1 - f.h); }
    show(el, f);
  };
  const up = () => { el.removeEventListener('pointermove', move); el.classList.remove('drag');
    if (['x', 'y', 'w', 'h'].some(k => f[k] !== o[k])) prep_dirty(); };
  el.addEventListener('pointermove', move); el.addEventListener('pointerup', up, { once: true }); el.addEventListener('pointercancel', up, { once: true });
}

const MOVES = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
function key(e, root) {
  if (!P.sel || e.target.closest('input, textarea, select, [contenteditable], dialog')) return;
  if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); del_field(P.sel); return; }
  const m = MOVES[e.key], el = root.querySelector(`[data-fid="${P.sel}"]`), f = field_of(el); if (!m || !f) return;
  e.preventDefault(); const step = e.shiftKey ? .02 : .004;
  f.x = clamp(f.x + m[0] * step, 0, 1 - f.w); f.y = clamp(f.y + m[1] * step, 0, 1 - f.h); show(el, f); prep_dirty();
