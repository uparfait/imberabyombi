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
