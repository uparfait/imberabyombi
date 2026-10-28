/* editor/io_import/process_uploads.js: convert the chosen files one by one (progress message), then put the result
   at the cursor, in new tabs, or in place of the document; failures are listed in a dialog, notes shown as a message.
   And file attachments (File attachment…): pick_any + attach_files. install_import: this area's page listeners (none). */
import { state, new_tab, el, toast, hide_toast, hist_timer, commit, begin_op, end_op, restore_focus, body_index, last_range, set_last_range } from '../core/index.js';
