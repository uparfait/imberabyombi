/* editor/ui/toolbar.js: the toolbar (source "toolbar wiring"): ACTIONS for the [data-ed] buttons (those with an effect on
   the text preview it on hover, a click keeps it), the dropdown buttons (zoom, styles, font, size, colours, image, align,
   spacing, checklist / bullet / number styles, mode), the menus toggle, the top bar's buttons, the size box, the title. */
import { state, refs, qsa, FONTS, undo, redo, restore_focus } from '../core/index.js';
