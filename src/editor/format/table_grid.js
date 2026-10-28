/* editor/format/table_grid.js: the "Insert › Table" grid picker (plain DOM for the menu engine's { render } item):
   hover to size the table, click to insert it; "Custom size and style…" opens the table dialog. */
import { ic_html } from '../../icons/index.js';
import { el } from '../core/index.js';
import { close_menus } from '../ui/index.js';
import { insert_table } from './table_ops.js';
