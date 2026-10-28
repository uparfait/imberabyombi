/* editor/content/pages.js: page management: a blank page after page i (add_blank_page) and deleting page i with
   everything on it (delete_page, after a confirm). Not in Pageless mode. */
import { el, toast, state, bodies, is_break, first_flow, last_flow, remove_page, caret_to_start, begin_op, end_op } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { ask } from '../../overlays/index.js';
