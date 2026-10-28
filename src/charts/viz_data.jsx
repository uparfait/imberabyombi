/* charts/viz_data.jsx: the data overlay. A click on the card opens all its data (20 rows a page, Back · n of n · Next); a click
   on one mark (bar, point, slice, cell, row, sparkline point) opens only that one, as Column name | Value. */
import { useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { qs } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { modal } from '../overlays/index.js';
import { kv_table } from '../table/index.js';
import { VIZ } from './viz_charts.js';
import { KPIS } from './kpi_parts.jsx';
import { VIZ_OUT } from './viz_view.jsx';

export const VIZ_PER = 20;
export let SHOWN = null;   /* { head, rows, p } of the open data table */
const PAGER = { set: null, n: 0 };   /* the open table's page setter; n numbers each opening (a fresh table starts on page 1) */
const str = v => String(v ?? '');
