/* table/table_body.jsx: the live part of a table card (what refresh(c) updates), computed while the card draws: the rows of
   the current page (Action Buttons first), the first-view loading row, the empty states, the row count and the pager. */
import { ic } from '../icons/index.js';
import { auth } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { ui, cur, loaded, render_flags, after_render } from '../store/index.js';
import { loading } from '../feedback/index.js';
import { cell, empty } from '../ui/index.js';
import { tview } from './table_view.js';
