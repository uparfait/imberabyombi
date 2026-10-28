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
