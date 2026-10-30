/* actions/act_admin.js: data-act handlers of the admin shell and its tools: email designs, nested navigation, side panels,
   notes, design tokens, backup and demo-data reset. Each handler changes data, and the page redraws from it. */
import { qs, qsa, ymd, dl } from '../lib/index.js';
import { ui, db, rerender } from '../store/index.js';
import { me } from '../auth/index.js';
import { reduced, notify } from '../feedback/index.js';
import { ask, slide_in } from '../overlays/index.js';
import { MAILS } from '../emails/index.js';
import { nav_draw, refresh_panel, ensure_mine } from '../admin/index.js';
import { redraw_charts } from '../charts/index.js';
import { to } from '../router/index.js';
import { apply_tokens } from './theme.js';

const EASE = 'cubic-bezier(.22,.8,.22,1)';

export const ADMIN_ACT = {
  /* Email designs: switch the previewed email in place (no page jump). The address changes first: the redraw reads ?t= */
  mail: t => { const k = t.dataset.k; if (!qs('#mail_view') || !MAILS[k]) return; ui.mail = k;
    history.replaceState(null, '', to('/admin/emails?t=' + k)); rerender();
    const v = qs('#mail_view'); if (v?.firstElementChild) slide_in([v.firstElementChild], 0); },
