/* editor/format/col_resize.js: column resizing by dragging the border between two cells. The widths live in a <colgroup>
   of % widths copied to every part of a table split across pages. install_format() adds the hover detection (the
   col_resize cursor on body) and the mousedown that starts a drag; it returns the cleanup. */
import { state, pages_el, el, begin_op, end_op, body_index, editable_of } from '../core/index.js';
import { table_chain } from './table_ops.js';
