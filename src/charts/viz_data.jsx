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

export function data_table(p) {
  const { head, rows } = SHOWN, n = Math.max(1, Math.ceil(rows.length / VIZ_PER)); p = SHOWN.p = Math.min(Math.max(1, p), n);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line"><div className="overflow-x-auto"><table className="viz_data">
      <thead><tr>{head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
      <tbody>{rows.slice((p - 1) * VIZ_PER, p * VIZ_PER).map((r, j) => (
        <tr key={j}>{r.map((v, i) => i ? <td key={i}>{str(v)}</td> : <th key={i} scope="row">{str(v)}</th>)}</tr>))}</tbody></table></div>
      <footer className="pager">
        <button type="button" className="btn btn_ghost btn_sm" data-act="viz_page" data-n="-1" disabled={p <= 1}>{ic('chev_l', 'h-4 w-4')}Back</button>
        <span className="text-sm text-muted">{`${p} of ${n}`}</span>
        <button type="button" className="btn btn_ghost btn_sm" data-act="viz_page" data-n="1" disabled={p >= n}>Next{ic('chev_r', 'h-4 w-4')}</button>
      </footer></div>
  );
}
/* the dialog body of a full table: its page is local state, changed by viz_page() */
function Viz_data() {
  const [p, set_p] = useState(SHOWN?.p || 1);
  useLayoutEffect(() => { PAGER.set = set_p; return () => { if (PAGER.set === set_p) PAGER.set = null; }; }, []);
  return <div id="viz_data" className="sm:col-span-2">{data_table(p)}</div>;
}

export function viz_open(card, e) {
  const k = card.dataset.chart, o = k ? VIZ_OUT[k] : KPIS[card.dataset.kpi]; if (!o) return;
  const title = k ? VIZ[k].t : o.t, help = k ? VIZ[k].d : o.d, [head, rows] = k ? o.table : [o.head, o.rows], m = e?.target?.closest?.('[data-tt]');
  if (m && card.contains(m)) {
