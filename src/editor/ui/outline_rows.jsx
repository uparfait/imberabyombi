/* editor/ui/outline_rows.jsx: what an outline row does: click → go to the heading; chevron → fold / unfold; ⋮ (or
   Shift+F10) → the section menu (Move section up / down, Delete section); drag → move the whole section (drop line,
   auto-scroll, reflow, one undo step). Keys: ↑ ↓ Home End move between rows, → unfold / first sub-heading, ← fold /
   parent, Enter / Space go to the heading, Alt+Shift+↑ / ↓ move the section. */
import { refs, caret_to_start } from '../core/index.js';
import { toggle_menu, open_menu } from './menu_engine.js';
import { section_model, section_moves, move_section, move_section_by, delete_section } from './sections.js';
import { outline_el, outline_rows, toggle_fold, render_outline } from './outline.js';
import { row_drag } from './row_drag.js';
import { confirm_dialog } from './dialogs.jsx';
import { clean_text, scaled } from './ui_dom.js';

function go(row) {
  const h = row._h; if (!h || !h.isConnected) return;
  h.scrollIntoView({ block: 'center', behavior: 'smooth' }); caret_to_start(h);
}
/* after a move: the outline now; the keyboard stays on the moved heading's row when the move came from it */
function moved(f, kb) {
  if (!f) return;
  render_outline();
