/* editor/content/boundaries.js: the caret at a page boundary: at the start / end of a page body, on its first / last
   line, and Backspace / Delete across two pages (merging the split paragraph back, removing a page break).
   Absolute images (front / behind text) are not text: the flow helpers (first_flow, last_flow) skip them. */
import { state, TEXT_BLOCK_RE, bodies, el_of, is_break, is_table, is_empty_block, last_non_break, same_kind, pad_bottom, first_flow, last_flow,
  merge_into, save_sel, restore_sel, caret_to_start, caret_to_end, caret_rect, begin_op, end_op } from '../core/index.js';

const no_text = rr => rr.toString().replace(/\u200b/g, '') === '' && !rr.cloneContents().querySelector('img');
