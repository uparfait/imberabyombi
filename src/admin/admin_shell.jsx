/* admin_shell.jsx: the admin shell (top bar, sidebar, side rail, panels): the admin page around a module view.
   The switches ACT.side flips in place (sidebar open / scrim) are set again from ui after every draw, so a redraw
   always shows the stored state; #main is new on every new page, so its enter animation plays again. */
import { ic, mark3d } from '../icons/index.js';
import { ui, render_flags, get_version } from '../store/index.js';
import { MODS } from '../auth/index.js';
import { sidebar } from './sidebar.jsx';
import { header_tools, RAIL } from './header_tools.jsx';
