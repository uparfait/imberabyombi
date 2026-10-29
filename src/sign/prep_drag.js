/* sign/prep_drag.js: placing fields by hand on the prepare page. Drag a field to move it, its corner to resize it (a stamp
   stays square); drop a tool (Signature, Stamp) on a page to add one there; a click on a page unselects. The selected field
   moves with the arrow keys (Shift: further) and goes with Delete or Backspace. prep_pointer(root) wires it all and
   returns the function that unwires it. Moves change the field's style at once and its record (P.doc) as they go. */
import { P, prep_dirty } from './prep_state.js';
