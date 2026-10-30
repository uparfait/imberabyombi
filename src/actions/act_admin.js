/* actions/act_admin.js: data-act handlers of the admin shell and its tools: email designs, nested navigation, side panels,
   notes, design tokens, backup and demo-data reset. Each handler changes data, and the page redraws from it. */
import { qs, qsa, ymd, dl, page_tz, device_tz, zone_of } from '../lib/index.js';
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

/* sets the time zone choice in Settings (as if picked), so Save and Cancel wake up when it differs from the one in use */
export const ADMIN_ACT = {
  /* Email designs: switch the previewed email in place (no page jump). The address changes first: the redraw reads ?t= */
  mail: t => { const k = t.dataset.k; if (!qs('#mail_view') || !MAILS[k]) return; ui.mail = k;
    history.replaceState(null, '', to('/admin/emails?t=' + k)); rerender();
    const v = qs('#mail_view'); if (v?.firstElementChild) slide_in([v.firstElementChild], 0); },
  /* Nested navigation: a tile (in a menu or on a page) opens that level's page; no menu opens by itself */
  nav_open: t => { const lvl = +t.dataset.level; ui.nav = [...ui.nav.slice(0, lvl - 1), +t.dataset.i]; nav_draw();
    const b = qs('#nav_demo .nav_page_body'); if (b && !reduced()) b.animate([{ opacity: 0, transform: 'translateY(.5rem)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: EASE }); },
  /* Side panels: opening slides the content in, closing fades it as the panel narrows, and switching panels slides the old one
     out and the new one in, so the change is easy to notice */
  panel: t => { const was = ui.panel, next = was === t.dataset.k ? null : t.dataset.k, pi = () => qs('#side_panel .panel_in');
    const anim = (kf, ms) => reduced() || !pi() ? null : pi().animate(kf, { duration: ms, easing: EASE }), slide = () => anim([{ opacity: 0, transform: 'translateX(1.5rem)' }, { opacity: 1, transform: 'none' }], 280);
    ui.panel = next; qsa('aside [data-act=panel]').forEach(b => b.classList.toggle('rail_on', b.dataset.k === next && !b.closest('#side_panel')));
    if (was && next) { const out = anim([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(-1.5rem)' }], 160); const swap = () => { refresh_panel(); slide(); }; out ? out.finished.then(swap) : swap(); return; }
    if (next) { refresh_panel(); slide(); } else anim([{ opacity: 1 }, { opacity: 0 }], 220);
    const sp = qs('#side_panel'); if (sp) sp.dataset.open = !!next; setTimeout(redraw_charts, 320); },
  note_del: t => { db.set('notes', db.get('notes', []).filter(n => n.id !== t.dataset.id)); refresh_panel(); },
  tz_device: () => { db.del('pageTz'); rerender(); notify('Times follow this device\'s time zone again.', 'ok', 'Time zone changed'); },
  tok_reset: () => { db.del('tokens'); apply_tokens(); rerender(); notify('Brand, radius, spacing and font follow the stylesheet again.', 'ok', 'Tokens reset'); },
  data_export: () => { const o = {}; db.keys().filter(k => k !== 'session').forEach(k => o[k] = db.get(k)); dl(`lorem-backup-${ymd()}.json`, JSON.stringify(o, null, 2), 'application/json'); notify('Keep the JSON file somewhere safe.', 'ok', 'Backup downloaded'); },
  data_reset: () => ask('Reset all demo data? Your session, theme and tokens stay. Everything else is replaced with fresh sample data.', () => {
    db.keys().filter(k => k.startsWith('c:') || ['roles', 'notes'].includes(k)).forEach(k => db.del(k)); ensure_mine(me()); rerender(); notify('Fresh sample data is loaded.', 'ok', 'Demo data reset'); }, 'Reset')
};
