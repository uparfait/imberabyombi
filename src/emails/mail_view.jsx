/* emails/mail_view.jsx: one email shown as in a mail app (subject, sender, the branded paper with header, body and
   footer), the Email designs page (/admin/emails?t=…) and its template picker (a "Your modules" menu, no second sidebar). */
import { mark3d } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem, fmt_stamp } from '../lib/index.js';
import { route, ui } from '../store/index.js';
