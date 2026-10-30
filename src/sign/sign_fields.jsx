/* sign/sign_fields.jsx: the fields drawn over a page, in the three ways a document is seen. Positions are fractions of the
   page (left, top, width, height), so a field keeps its place at any width.
   edit: the owner places them (dashed, in the signer's colour, their name on a tag, x to remove, a corner to resize);
   sign: the signer's own fields are buttons (to do: pulsing; done: their mark) and the others say who signs there;
   view: every mark placed so far, and a dashed box for each one still to come. */
import { ic } from '../icons/index.js';
import { KINDS, rec_of } from './sign_store.js';

export const at = f => ({ left: `${f.x * 100}%`, top: `${f.y * 100}%`, width: `${f.w * 100}%`, height: `${f.h * 100}%` });
const look = (f, r) => ({ ...at(f), '--c': r?.color || '#94A3B8' });

const edit_field = (d, f, sel) => { const r = rec_of(d, f.rid), [l, i] = KINDS[f.type];
