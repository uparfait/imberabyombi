/* editor/ui/row_drag.js: drag a row of a sidebar list to a new place (tabs, outline sections): pointer based, starts after
   5 px (sizes scale with the root font); a drop line (.drop_line, fixed, brand) shows where it lands, the lists that
   scroll follow the pointer near their edges, Esc cancels, and the click that ends a drag does not also act as a click.
   o: { row, list, cls, rows() → visible rows, target(gap, rows) → drop value or null, drop(value), scrollers: [els] } */
import { el } from '../core/index.js';
