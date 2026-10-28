/* editor/format/insert.js: block insertion at the caret (tables, page breaks, lines, images go through
   insert_block_at_caret, which splits the paragraph when the caret is inside it) and plain text insertion. */
import { TEXT_BLOCK_RE, el, editable_of, restore_focus, top_block, is_empty_block, is_list, is_table, is_break, offset_within,
  caret_to_start, body_index, toast, begin_op, end_op, scroll_caret_into_view } from '../core/index.js';
import { can_edit } from './commands.js';

/* ================= block insertion ================= */
/* inserts node as a top-level block at the caret and returns it (null when it could not). The caller ends the op. */
export function insert_block_at_caret(node) {
  if (!can_edit()) return null;
  restore_focus();
  const s = getSelection(); if (!s.rangeCount) return null;
  const r = s.getRangeAt(0); const host = editable_of(r.startContainer);
  if (!host || !host.classList.contains('pg_body')) { toast('Place the cursor in the document body first'); return null; }
  begin_op(); r.deleteContents();
  let block = top_block(host, r.startContainer);
  if (block && block.nodeType !== 1) block = null;
  if (!block) host.appendChild(node);
  else if (is_empty_block(block)) block.before(node);
  else if (is_list(block) || is_table(block)) block.after(node);
  else {
    const o = offset_within(block, r.startContainer, r.startOffset), len = block.textContent.length;
    if (o === 0 && !block.querySelector('img')) block.before(node);
    else if (o >= len) block.after(node);
    else {
      const r2 = document.createRange(); r2.setStart(r.startContainer, r.startOffset); r2.setEnd(block, block.childNodes.length);
      const nb = block.cloneNode(false); nb.removeAttribute('data-cont'); nb.appendChild(r2.extractContents()); block.after(nb); block.after(node);
    }
  }
  const nx = node.nextElementSibling;
  if (!nx || !TEXT_BLOCK_RE.test(nx.tagName) || is_break(nx)) node.after(el('p', {}, '<br>'));
  return node;
}
export function insert_page_break() {
  const pb = insert_block_at_caret(el('div', { class: 'page_break', contenteditable: 'false' })); if (!pb) return;
