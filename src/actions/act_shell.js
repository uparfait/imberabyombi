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
