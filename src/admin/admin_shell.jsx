/* admin_shell.jsx: 10. ADMIN SHELL (top bar, sidebar, side rail, panels): the admin page around a module view.
   The switches ACT.side flips in place (sidebar open / scrim) are set again from ui after every draw, as the reference's
   fresh HTML did; #main is new on every new page, so its enter animation plays again. */
import { ic, i3 } from '../icons/index.js';
import { ui, render_flags, get_version } from '../store/index.js';
import { MODS } from '../auth/index.js';
