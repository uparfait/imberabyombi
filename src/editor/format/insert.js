/* editor/format/insert.js: block insertion at the caret (tables, page breaks, lines, images go through
   insert_block_at_caret, which splits the paragraph when the caret is inside it) and plain text insertion. */
import { TEXT_BLOCK_RE, el, editable_of, restore_focus, top_block, is_empty_block, is_list, is_table, is_break, offset_within,
