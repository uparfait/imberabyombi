/* table/col_filter.jsx: Column search control: a select for fixed choices, a date for date columns, a text search for
   everything else. It sits under each column title; typing filters the rows at once (the input listener → refresh). */
import { schemas } from '../schemas/index.js';
import { ui } from '../store/index.js';
import { label, options, search_ui } from '../ui/index.js';
import { dt_attrs } from '../fields/index.js';

export function col_filter(c, k) {
  const f = schemas[c].f.find(x => x.k === k), v = ui.q[c]?.[k] || '';
  const a = { className: 'table_filter', 'data-search': c, 'data-k': k, 'aria-label': `Filter by ${label(c, k)}` };
