/* sign/pad_state.js: what the signature dialog's tabs share: PAD.get() (set by the tab on show: the mark as a PNG data
   URL, or null while there is none), the ink colour, and trim(canvas), the visible part cut out with a margin. */
export const PAD = { get: async () => null };
export const INK = '#16204A';

/* the smallest box around every pixel that is not transparent, plus pad pixels around it, as a PNG (null if empty) */
