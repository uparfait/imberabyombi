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
  const r = kb && outline_rows(outline_el()).find(x => x._h === f);
  if (r && !r.hidden) r.focus();
}
function section_items(row, kb) {
  const k = row._ti, mv = section_moves(k), text = clean_text(row._h);
  return [
    { label: 'Move section up', icon: 'arrow_upward', disabled: !mv.up, no_preview: true, action: () => moved(move_section_by(k, -1), kb) },
    { label: 'Move section down', icon: 'arrow_downward', disabled: !mv.down, no_preview: true, action: () => moved(move_section_by(k, 1), kb) },
    { sep: true },
    { label: 'Delete section', icon: 'delete', no_preview: true, action: () => confirm_dialog(
      <>Delete the section <strong>{text}</strong>? The heading and everything under it are removed. You can undo this with Ctrl+Z.</>, 'Delete')
      .then(ok => { if (ok) { delete_section(k); render_outline(); } }) }
  ];
}
function open_section_menu(row, btn, kb) {
  if (row._ti < 0) return;
  if (btn) { toggle_menu(btn, () => section_items(row, kb), { focus: kb }); return; }
  const b = row.getBoundingClientRect();
  open_menu(null, section_items(row, true), { x: b.left + scaled(24), y: b.bottom, focus: true });
}

function on_key(e, row) {
  if (e.target !== row) return;
