/* editor/format/blocks.js: paragraph-level formatting on the selected blocks: paragraph styles, line spacing, space
   before / after, indent, clear formatting, and changing the case of the selected text. */
import { STYLES, refs, el, qsa, el_of, editable_of, text_nodes, mk_range, restore_focus, save_sel, restore_sel, sel_remap, last_range,
  body_index, toast, begin_op, end_op } from '../core/index.js';
import { can_edit, exec } from './commands.js';

/* the top-most text blocks the last selection touches */
export function selected_blocks() {
  const r = last_range; if (!r) return [];
  const host = editable_of(r.startContainer); if (!host) return [];
  const cand = qsa('p,h1,h2,h3,h4,h5,h6,li,blockquote,pre', host).filter(b => r.intersectsNode(b));
  return cand.filter(b => !cand.some(o => o !== b && b.contains(o)));
}
/* run fn(blocks) as one undo step; a table cell with bare text gets a <p> first so it has a block to style */
export function with_blocks(fn) {
  if (!can_edit()) return;
  const host = restore_focus(); begin_op();
  const sel = save_sel(); let blocks = selected_blocks();
  if (!blocks.length && last_range) {
    const td = el_of(last_range.startContainer).closest('td,th');
    if (td) { const p = el('p'); while (td.firstChild) p.appendChild(td.firstChild); if (!p.firstChild) p.innerHTML = '<br>'; td.appendChild(p); blocks = [p]; }
  }
  fn(blocks);
  restore_sel(sel);
