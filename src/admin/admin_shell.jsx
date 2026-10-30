/* admin_shell.jsx: the admin shell (top bar, sidebar, side rail, panels): the admin page around a module view.
   The switches ACT.side flips in place (sidebar open / scrim) are set again from ui after every draw, so a redraw
   always shows the stored state; #main is new on every new page, so its enter animation plays again. */
import { ic, mark3d } from '../icons/index.js';
import { ui, render_flags, get_version } from '../store/index.js';
import { MODS } from '../auth/index.js';
import { sidebar } from './sidebar.jsx';
import { header_tools, RAIL } from './header_tools.jsx';
import { panel_html } from './panel_html.jsx';
import { Live_slot, sync_ref } from './live_slot.jsx';

const panel_now = () => ui.panel ? panel_html(ui.panel) : null;
const desk_min = () => ui.side_min && innerWidth >= 1024;
const side_sync = el => { el.dataset.open = ui.side; el.dataset.min = ui.side_min; el.inert = desk_min(); };
const scrim_sync = el => { el.classList.toggle('on', ui.side); };

/* a new key for #main on a new page, or on a redraw that keeps the page-enter motion (render(true, true)) */
