/* panel_html.jsx: a side panel's header (system name, title, tools, close) and body; refresh_panel() draws the open panel
   again, and only it, as the reference did (its .panel_in box stays, so the slide ACT.panel runs on it still plays). */
import { ic } from '../icons/index.js';
import { ui } from '../store/index.js';
import { cfg } from '../config/index.js';
import { PANELS } from './panels.jsx';
import { redraw_slot } from './live_slot.jsx';

export const panel_html = k => <><header className="sticky top-0 z-[1] flex items-center gap-1 bg-surface px-4 pb-3 pt-4">
    <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{cfg.name}</p>
