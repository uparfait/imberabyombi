/* editor/chrome/topbar.jsx: the title + menu bar with a Back button (source #topbar). Open at first; the toolbar's chevron
   (#menus_toggle) toggles .show on #topbar, which opens / closes it smoothly. Menu buttons carry data-menu (the editor opens
   that menu); the top buttons are wired by id. */
import { ic, i3 } from '../../icons/index.js';

const MENUBAR = [['file', 'File'], ['edit', 'Edit'], ['view', 'View'], ['insert', 'Insert'], ['format', 'Format'], ['tools', 'Tools'], ['help', 'Help']];
