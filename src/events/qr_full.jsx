/* events/qr_full.jsx: the attendance QR code on the whole screen (the browser's own full screen; where there is none,
   over the page), as large as the screen allows so people far away can scan it, with the title, the live count and the
   link beside it (under it on a tall screen). Esc or × closes it. QR_ACT: its buttons. */
import { qs, qsa } from '../lib/index.js';
import { ic } from '../icons/index.js';
