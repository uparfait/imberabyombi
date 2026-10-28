/* editor/content/links.jsx: links: insert / edit (open_link_dialog: Text + Link), remove, and the address clean-up
   (normalize_url: "lorem.io" → https://lorem.io, "a@b.io" → mailto:). */
import { qs, esc_html, last_range, el_of, editable_of, restore_focus, begin_op, end_op, body_index } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
