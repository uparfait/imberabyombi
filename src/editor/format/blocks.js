/* editor/format/blocks.js: paragraph-level formatting on the selected blocks: paragraph styles, line spacing, space
   before / after, indent, clear formatting, and changing the case of the selected text. */
import { STYLES, refs, el, qsa, el_of, editable_of, text_nodes, mk_range, restore_focus, save_sel, restore_sel, sel_remap, last_range,
  body_index, toast, begin_op, end_op } from '../core/index.js';
import { can_edit, exec } from './commands.js';

/* the top-most text blocks the last selection touches */
