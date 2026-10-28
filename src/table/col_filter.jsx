/* table/col_filter.jsx: Column search control: a select for fixed choices, a date for date columns, a text search for
   everything else. It sits under each column title; typing filters the rows at once (the input listener → refresh). */
import { schemas } from '../schemas/index.js';
import { ui } from '../store/index.js';
