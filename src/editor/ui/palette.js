/* editor/ui/palette.js: the colour palette shown inside a menu (text colour, highlight, table and image colours):
   a reset / none choice, the PALETTE swatches and a custom colour. Hover previews a colour, a click keeps it;
   while the custom colour picker is open each colour shows at once and the confirmed one stays. */
import { el, esc_html, PALETTE } from '../core/index.js';
import { close_menus } from './menu_engine.js';
import { peek, peek_on, keep, unpeek } from './hover_preview.js';
import { mi } from './ui_dom.js';

/* on_pick(colour or null); none_label: the text of the reset choice ('Reset', 'None', 'Black'…) */
export function palette_el(on_pick, none_label) {
