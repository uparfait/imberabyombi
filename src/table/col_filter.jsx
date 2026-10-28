/* table/col_filter.jsx: Column search control: a select for fixed choices, a date for date columns, a text search for
   everything else. It sits under each column title; typing filters the rows at once (the input listener → refresh). */
import { schemas } from '../schemas/index.js';
import { ui } from '../store/index.js';
import { label, options, search_ui } from '../ui/index.js';
import { dt_attrs } from '../fields/index.js';

export function col_filter(c, k) {
