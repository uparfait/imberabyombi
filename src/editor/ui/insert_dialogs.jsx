/* editor/ui/insert_dialogs.jsx: Insert › Special characters (each click types the character at the caret while the dialog
   stays open) and Insert / Replace image by URL, in the template's modal. */
import { last_range, last_host, set_last, begin_op, end_op, body_index, editable_of, restore_focus, pages_el } from '../core/index.js';
import { can_edit } from '../format/index.js';
import { img_op, insert_image } from '../content/index.js';
