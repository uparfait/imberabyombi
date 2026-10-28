/* editor/format/table_grid.js: the "Insert › Table" grid picker (plain DOM for the menu engine's { render } item):
   hover to size the table, click to insert it; "Custom size and style…" opens the table dialog. */
import { ic_html } from '../../icons/index.js';
import { el } from '../core/index.js';
import { close_menus } from '../ui/index.js';
import { insert_table } from './table_ops.js';
import { custom_table_dialog } from './table_dialogs.jsx';

export function table_grid_el() {
  const box = el('div', { class: 'grid_picker' }), g = el('div', { class: 'g' }), lbl = el('div', { class: 'lbl' }, '1 × 1'), cells = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 10; c++) {
    const d = el('div', { class: 'c' }); d.dataset.r = r; d.dataset.c = c; cells.push(d); g.appendChild(d);
    d.addEventListener('mouseenter', () => { cells.forEach(x => x.classList.toggle('on', +x.dataset.r <= r && +x.dataset.c <= c)); lbl.textContent = `${c + 1} × ${r + 1}`; });
    d.addEventListener('click', () => { close_menus(0); insert_table(r + 1, c + 1); });
  }
  const more = el('button', { type: 'button', class: 'pal_reset', style: 'margin-top:8px' }, ic_html('tune', 'h-5 w-5') + 'Custom size and style…');
  more.addEventListener('click', () => { close_menus(0); custom_table_dialog(); });
  box.append(g, lbl, more); return box;
}
