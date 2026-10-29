/* sign/sign_fields.jsx: the fields drawn over a page, in the three ways a document is seen. Positions are fractions of the
   page (left, top, width, height), so a field keeps its place at any width.
   edit: the owner places them (dashed, in the signer's colour, their name on a tag, x to remove, a corner to resize);
   sign: the signer's own fields are buttons (to do: pulsing; done: their mark) and the others say who signs there;
   view: every mark placed so far, and a dashed box for each one still to come. */
import { ic } from '../icons/index.js';
