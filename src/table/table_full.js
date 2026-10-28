/* table/table_full.js: Full screen (right of the table tools): the table grows from its place to fill the tab (not the
   browser's fullscreen) and shrinks back into it. While full, a placeholder (.table_ph) keeps the card's place in the page. */
import { qs } from '../lib/index.js';
import { ui, rerender, before_render } from '../store/index.js';
import { reduced } from '../feedback/index.js';
import { tip } from '../overlays/index.js';
import { close_pops } from '../actions/index.js';

const PH = {};   /* collection → the card's height when it went full screen (the placeholder's height) */
before_render(keep => { if (!keep) for (const c in PH) delete PH[c]; });
export const ph_height = c => PH[c] ? `${PH[c]}px` : '24rem';
