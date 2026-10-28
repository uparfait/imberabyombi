/* table/kv_table.jsx: Details table: COLUMN NAME | VALUE, with a category row before each group.
   groups = [[title, [[name, value (JSX or text)], …]], …]; an empty value shows a dash. */
import { Fragment } from 'react';
import { dash } from '../ui/index.js';

const blank = v => v === '' || v == null || v === false;

export const kv_table = groups => (
