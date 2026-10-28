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
