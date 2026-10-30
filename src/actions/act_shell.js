/* actions/act_shell.js: data-act handlers of the shell: theme, menus, drawer and dialogs, search buttons, inline messages,
   sidebar, scrolling, sign-out, copy, help tips, the password eye and the command palette.
   Swaps on React nodes change attributes or a single text only (an icon is one <path>: its d changes). */
import { qs, qsa } from '../lib/index.js';
import { PATHS } from '../icons/index.js';
import { ui, db } from '../store/index.js';
import { auth } from '../auth/index.js';
import { reduced, staff_page, notify_next, form_msg } from '../feedback/index.js';
import { close_dialog, request_close, ask, copy, tip, show_in_dialog } from '../overlays/index.js';
import { set_native_value } from '../fields/index.js';
import { drawer_content } from '../site/index.js';
import { redraw_charts } from '../charts/index.js';
import { header_line } from '../behaviors/index.js';
import { resend_in } from '../account/index.js';
import { go, previous_path } from '../router/index.js';
import { set_theme } from './theme.js';
import { close_pops, toggle_pop } from './pops.js';
import { open_cmd } from './open_cmd.jsx';

/* a node React draws (it carries React's fiber key) is hidden instead of removed */
const react_owned = el => Object.keys(el).some(k => k.startsWith('__reactFiber$'));
const icon_to = (t, n) => t.querySelector('path')?.setAttribute('d', PATHS[n]);

export const SHELL_ACT = {
  theme: () => set_theme(document.documentElement.classList.contains('dark') ? 'light' : 'dark'),
  pop: t => toggle_pop(t.dataset.pop),
  drawer: () => show_in_dialog('drawer', drawer_content),
  close_drawer: () => close_dialog(qs('#drawer')),
  close_modal: () => request_close(qs('#modal')),
  confirm_keep: () => close_dialog(qs('#confirm')),
  confirm_discard: () => { const c = qs('#confirm'), yes = c._yes; c._yes = null; close_dialog(c); yes?.(); },
  close_viewer: () => close_dialog(qs('#viewer')),
  clear_search: t => { const i = t.parentElement.querySelector('input[type=search]'); if (!i) return; set_native_value(i, ''); i.dispatchEvent(new Event('input', { bubbles: true })); i.focus({ preventScroll: true }); },
  run_search: t => { const i = t.parentElement.querySelector('input[type=search]'); if (!i) return; i.focus({ preventScroll: true }); i.dispatchEvent(new Event('input', { bubbles: true })); },
  msg_x: t => { const m = t.closest('.msg'); if (!m) return; m.classList.add('msg_out'); setTimeout(() => (react_owned(m) ? (m.hidden = true) : m.remove()), reduced() ? 0 : 300); },
  side: () => { if (innerWidth < 1024) { ui.side = !ui.side; const s = qs('#sidebar'); s.inert = false; s.dataset.open = ui.side; qs('#sidebar_scrim').classList.toggle('on', ui.side); }
    else { ui.side_min = !ui.side_min; db.set('sideMin', ui.side_min); const s = qs('#sidebar'); s.dataset.min = ui.side_min; s.inert = ui.side_min; setTimeout(redraw_charts, 320); } header_line(); },
  /* Sidebar sections fold in place (no re-render), so the height animation plays */
  group: t => { const k = t.dataset.g, closed = !ui.closed[k], f = t.nextElementSibling; ui.closed[k] = closed; db.set('sideClosed', ui.closed);
    t.setAttribute('aria-expanded', !closed); f.dataset.closed = closed; f.inert = closed; },
  scroll: t => { const el = document.getElementById(t.dataset.to); el?.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (t.dataset.to === 'main') el?.focus?.(); },
  top: () => scrollTo({ top: 0, behavior: 'smooth' }),
  logout: () => { close_pops(); ask('Sign out? You will need to sign in again to keep working.', () => { auth.logout(); notify_next('Sign in again to keep working.', 'info', 'Signed out'); close_dialog(qs('#modal')); go('/login'); }, 'Sign out', true); },
  /* Copy: a .copy_btn shows "Copied" with a check for 1.6 s (its icon path and its label's text change, then change back) */
  copy: t => { const btn = t.matches('.copy_btn'); copy(t.dataset.text, t.dataset.what || 'Link', btn && !staff_page());
    if (!btn || t._was) return; const s = t.querySelector('span'); t._was = [t.querySelector('path')?.getAttribute('d'), s?.textContent];
    icon_to(t, 'check'); if (s) s.textContent = 'Copied'; t.classList.add('done');
    setTimeout(() => { t.querySelector('path')?.setAttribute('d', t._was[0]); if (s) s.textContent = t._was[1]; t._was = null; t.classList.remove('done'); }, 1600); },
  /* Help icon: a tap shows its tooltip on touch screens (hover and keyboard focus show it already) */
