/* editor/format/paint.js: paint format: start_paint() copies the character format at the caret (#paint_btn turns
   active); the next text selection gets it (apply_paint, run by the pages' mouseup while paint is set). */
import { refs, el_of, editable_of, to_hex, last_range, set_last, set_last_range, toast } from '../core/index.js';
import { exec, set_font_size } from './commands.js';

/* the copied format while paint format is on, else null (read-only outside: end it with stop_paint()) */
export let paint = null;
const btn = on => refs.paint_btn?.classList.toggle('active', on);
export function stop_paint() { paint = null; btn(false); }
export function start_paint() {
  if (paint) { stop_paint(); return; }
  if (!last_range) { toast('Click into text first'); return; }
  const n = el_of(last_range.startContainer), cs = getComputedStyle(n);
  let bg = null, e = n;
  while (e && !e.classList.contains('pg_body')) { const b = getComputedStyle(e).backgroundColor; if (to_hex(b)) { bg = b; break; } e = e.parentElement; }
  const dec = []; e = n;
  while (e && !e.classList.contains('pg_body')) { const d = getComputedStyle(e).textDecorationLine; if (d && d !== 'none') dec.push(d); e = e.parentElement; }
  paint = {
    bold: parseInt(cs.fontWeight) >= 600, italic: cs.fontStyle === 'italic', underline: dec.join(' ').includes('underline'),
    strike: dec.join(' ').includes('line-through'), color: cs.color, bg, font: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
    size: Math.round(parseFloat(cs.fontSize) * 0.75 * 2) / 2
  };
  btn(true); toast('Select the text to apply the format to', 2000);
}
export function apply_paint() {
  const p = paint; stop_paint(); if (!p) return;
  const s = getSelection(); if (!s.rangeCount || s.isCollapsed) return;
  const r = s.getRangeAt(0).cloneRange(); set_last(r, editable_of(r.startContainer));
  exec('removeFormat');
  document.execCommand('styleWithCSS', false, true);
  if (p.bold) document.execCommand('bold'); if (p.italic) document.execCommand('italic');
  if (p.underline) document.execCommand('underline'); if (p.strike) document.execCommand('strikeThrough');
  document.execCommand('foreColor', false, p.color); if (p.bg) document.execCommand('hiliteColor', false, p.bg);
  document.execCommand('fontName', false, p.font);
  set_last_range(getSelection().getRangeAt(0).cloneRange());
