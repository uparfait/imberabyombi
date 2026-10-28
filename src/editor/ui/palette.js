/* editor/ui/palette.js: the colour palette shown inside a menu (text colour, highlight, table and image colours):
   a reset / none choice, the PALETTE swatches and a custom colour. Hover previews a colour, a click keeps it;
   while the custom colour picker is open each colour shows at once and the confirmed one stays. */
import { el, esc_html, PALETTE } from '../core/index.js';
import { close_menus } from './menu_engine.js';
import { peek, peek_on, keep, unpeek } from './hover_preview.js';
import { mi } from './ui_dom.js';

/* on_pick(colour or null); none_label: the text of the reset choice ('Reset', 'None', 'Black'…) */
export function palette_el(on_pick, none_label) {
  const box = el('div', { class: 'palette px-1 pb-1' }), done = () => close_menus(0);
  const reset = el('button', { type: 'button', class: 'menu_item pal_reset' }, mi('format_color_reset', 'h-4 w-4 shrink-0 text-muted') + esc_html(none_label));
  peek_on(reset, 'pal_none', () => on_pick(null), done);
  box.appendChild(reset);
  PALETTE.forEach(row => {
    const r = el('div', { class: 'pal_row mt-1 flex gap-1' });
    row.forEach(c => {
      const b = el('button', { type: 'button', class: 'pal_sw h-[1.125rem] w-[1.125rem] shrink-0 rounded-full border border-line', style: `background:${c}`, 'aria-label': c, 'data-tip': c });
