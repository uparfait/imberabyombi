/* table/table_body.jsx: the live part of a table card (what refresh(c) updates), computed while the card draws: the rows of
   the current page (Action Buttons first), the first-view loading row, the empty states, the row count and the pager. */
import { ic } from '../icons/index.js';
import { auth } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { ui, cur, loaded, render_flags, after_render } from '../store/index.js';
import { loading } from '../feedback/index.js';
import { cell, empty } from '../ui/index.js';
import { tview } from './table_view.js';
import { pager } from './table_parts.jsx';
import { rows_of, wait_load } from './rows.js';

/* a row's buttons: the page's own (o.acts) + Edit and Delete for managers (unless o.can_row says no); null when none */
function row_acts(c, o, r, can) {
  const extra = o.acts ? o.acts(r, can) : null, own = can && (!o.can_row || o.can_row(r));
  if (!extra && !own) return null;
  return (
    <>
