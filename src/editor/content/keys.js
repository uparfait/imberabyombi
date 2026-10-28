/* editor/content/keys.js: the pages' keyboard: Tab (next cell / new row, list level, indent, tab character), Ctrl+Enter
   (page break), Delete / Backspace on a selected image, Backspace / Delete / arrows across page boundaries; the browser's
   undo / redo inputs; and input (reflow + history, header / footer copied to every page). Handled keys stop here. */
import { qsa, state, pages_el, bodies, body_index, editable_of, el_of, is_list, is_table, first_flow, last_non_break, set_last, set_last_range,
  caret_to_start, caret_to_end, scroll_caret_into_view, begin_op, end_op, commit_soon, schedule_reflow, undo, redo, save_soon } from '../core/index.js';
import { indent, insert_page_break, tbl_op } from '../format/index.js';
import { img_sel, hide_img_sel } from './img_sel.js';
import { at_body_start, at_body_end, on_first_line, on_last_line, backspace_across, delete_across } from './boundaries.js';

export function handle_tab(e, r, host) {
  e.preventDefault();
  const n = el_of(r.startContainer), td = n.closest('td,th');
  if (td && host.contains(td)) {
    const cells = qsa('td,th', td.closest('table')), i = cells.indexOf(td) + (e.shiftKey ? -1 : 1);
    if (i >= cells.length) { set_last_range(r.cloneRange()); tbl_op('row_below'); return; }
    if (i >= 0) caret_to_start(cells[i]); return;
  }
  if (n.closest('li')) { document.execCommand(e.shiftKey ? 'outdent' : 'indent'); return; }
  if (e.shiftKey) { indent(-1); return; }
  document.execCommand('insertText', false, '\t');
}

/* the key was handled: no other listener (template shortcuts) sees it */
const done = e => { e.preventDefault(); e.stopPropagation(); };
export function pages_keydown(e) {
  const host = editable_of(e.target); if (!host) return;
  if (img_sel) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      done(e); const img = img_sel, b = img.closest('.pg_body'); hide_img_sel(); begin_op(); img.remove(); end_op(body_index(b)); return;
    }
    hide_img_sel();
  }
  if (!host.classList.contains('pg_body') || state.mode !== 'edit') return;
  const s = getSelection(); if (!s.rangeCount) return; const r = s.getRangeAt(0);
