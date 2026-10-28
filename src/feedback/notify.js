/* feedback/notify.js: A. Bottom-right notifications (#toasts, cloned from <template id="tpl_toast">) on staff pages,
   the same message inline elsewhere (inline_note), and the message a form leaves for the next page (notify_next). */
import { qs, esc } from '../lib/index.js';
import { ic_html } from '../icons/index.js';
import { reduced, TICON, TTITLE, staff_page } from './basics.js';
import { show_msg, slot_of, new_slot } from './messages.jsx';
