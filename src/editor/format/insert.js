/* editor/format/insert.js: block insertion at the caret (tables, page breaks, lines, images go through
   insert_block_at_caret, which splits the paragraph when the caret is inside it) and plain text insertion. */
import { TEXT_BLOCK_RE, el, editable_of, restore_focus, top_block, is_empty_block, is_list, is_table, is_break, offset_within,
  caret_to_start, body_index, toast, begin_op, end_op, scroll_caret_into_view } from '../core/index.js';
import { can_edit } from './commands.js';

/* ================= block insertion ================= */
/* inserts node as a top-level block at the caret and returns it (null when it could not). The caller ends the op. */
export function insert_block_at_caret(node) {
