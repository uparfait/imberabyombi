/* kit/kit_tables.jsx: the Tables specimen: a plain semantic table (caption, colgroup, head, body, foot; a row opens
   its details through data-act="row") and the data table every admin list uses (crud, staff demo data). */
import { lorem, money } from '../lib/index.js';
import { badge, person, bar_cell } from '../ui/index.js';
import { crud } from '../table/index.js';

const DATA_HELP = 'Every admin list uses this: search inside each column, sort by a header, long text trimmed (hover for the full text), '
  + 'click a row for full details, Back · n of n · Next at the bottom. The settings icon sets rows per page and columns, the corner icon opens '
  + 'it full screen, and Action Buttons stay first while it scrolls. It loads with the same spinner as everything else.';

const row = i => {
  const n = lorem.name();
  return (
    <tr key={i} data-act="row" data-title={n} tabIndex={0} className="cursor-pointer"><td>{person(n)}</td><td>{badge(lorem.pick(['Active', 'Pending', 'Closed']))}</td>
      <td>{bar_cell(lorem.int(10, 90), 100)}</td><td className="text-right tabular-nums">{money(lorem.int(100, 900))}</td></tr>
  );
};

export const kit_tables = () => (
  <>
    <div className="card overflow-x-auto p-2"><table><caption className="px-4 pt-3">{lorem.t(3)}</caption><colgroup><col /><col span={2} className="hl" /><col /></colgroup>
      <thead><tr><th scope="col">Name</th><th scope="col">Lorem</th><th scope="col">Ipsum</th><th scope="col" className="text-right">Total</th></tr></thead>
      <tbody>{[0, 1, 2, 3].map(row)}</tbody>
      <tfoot><tr><th scope="row">Sum</th><td></td><td></td><td className="text-right">{money(2190)}</td></tr></tfoot></table></div>
    <h3 className="mt-10 text-xl">Data table</h3><p className="mt-1 max-w-prose text-sm text-muted">{DATA_HELP}</p>
