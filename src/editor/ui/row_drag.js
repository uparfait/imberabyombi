/* editor/ui/row_drag.js: drag a row of a sidebar list to a new place (tabs, outline sections): pointer based, starts after
   5 px (sizes scale with the root font); a drop line (.drop_line, fixed, brand) shows where it lands, the lists that
   scroll follow the pointer near their edges, Esc cancels, and the click that ends a drag does not also act as a click.
   o: { row, list, cls, rows() → visible rows, target(gap, rows) → drop value or null, drop(value), scrollers: [els] } */
import { el } from '../core/index.js';
import { scaled } from './ui_dom.js';

export function row_drag(e, o) {
  if (e.button !== 0 || e.pointerType === 'touch') return;
  const x0 = e.clientX, y0 = e.clientY, EDGE = scaled(36), START = scaled(5);
  let on = false, py = y0, val = null, line = null, raf = 0;
  const place = () => {
    const rs = o.rows(); let g = rs.length;
    for (let i = 0; i < rs.length; i++) { const b = rs[i].getBoundingClientRect(); if (py < b.top + b.height / 2) { g = i; break; } }
    val = rs.length ? o.target(g, rs) : null;
    if (val == null) { line.hidden = true; return; }
    const b = rs[Math.min(g, rs.length - 1)].getBoundingClientRect(), y = g < rs.length ? b.top : b.bottom;
    Object.assign(line.style, { left: b.left + 'px', width: b.width + 'px', top: Math.round(y - 1) + 'px' }); line.hidden = false;
  };
  const edge = () => {
    for (const s of o.scrollers || []) {
      if (!s || s.scrollHeight <= s.clientHeight) continue;
      const b = s.getBoundingClientRect(), d = py < b.top + EDGE ? -Math.ceil((b.top + EDGE - py) / 4) : py > b.bottom - EDGE ? Math.ceil((py - b.bottom + EDGE) / 4) : 0;
      if (!d) continue;
      const before = s.scrollTop; s.scrollTop += d; if (s.scrollTop !== before) break;
    }
  };
  const tick = () => { edge(); place(); raf = requestAnimationFrame(tick); };
  const move = ev => {
    py = ev.clientY;
    if (!on) {
      if (Math.abs(py - y0) < START && Math.abs(ev.clientX - x0) < START) return;
