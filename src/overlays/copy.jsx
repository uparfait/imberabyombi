/* overlays/copy.jsx: copy() puts text on the clipboard (with a fallback for older browsers) and says so;
   copy_box() is the copyable value (code, key, link, token) with its Copy button (data-act="copy"). */
import { ic } from '../icons/index.js';
import { notify } from '../feedback/index.js';
