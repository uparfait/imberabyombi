/* actions/act_shell.js: data-act handlers of the shell: theme, menus, drawer and dialogs, search buttons, inline messages,
   sidebar, scrolling, sign-out, copy, help tips, the password eye and the command palette.
   Swaps on React nodes change attributes or a single text only (an icon is one <path>: its d changes). */
import { qs, qsa } from '../lib/index.js';
import { PATHS } from '../icons/index.js';
import { ui, db } from '../store/index.js';
import { auth } from '../auth/index.js';
import { reduced, staff_page, notify_next, form_msg } from '../feedback/index.js';
import { close_dialog, request_close, ask, copy, tip, show_in_dialog } from '../overlays/index.js';
import { set_native_value } from '../fields/index.js';
import { drawer_content } from '../site/index.js';
import { redraw_charts } from '../charts/index.js';
import { header_line } from '../behaviors/index.js';
import { resend_in } from '../account/index.js';
