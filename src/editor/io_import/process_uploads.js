/* editor/io_import/process_uploads.js: convert the chosen files one by one (progress message), then put the result
   at the cursor, in new tabs, or in place of the document; failures are listed in a dialog, notes shown as a message.
   And file attachments (File attachment…): pick_any + attach_files. install_import: this area's page listeners (none). */
import { state, new_tab, el, toast, hide_toast, hist_timer, commit, begin_op, end_op, restore_focus, body_index, last_range, set_last_range } from '../core/index.js';
import { sanitize_html, render_comments } from '../content/index.js';
import { can_edit } from '../format/index.js';
import { save_tab, render_tab, render_sidebar, render_all, confirm_dialog } from '../ui/index.js';
import { base_of } from './file_helpers.js';
import { attachment_html } from './json_attach.js';
