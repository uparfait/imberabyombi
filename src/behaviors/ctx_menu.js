/* behaviors/ctx_menu.js: the right-click menu (#ctx, outside React, filled as an HTML string like the reference).
   Right-click menu on the page body: quick links (signed in: Tasks and Calendar; visitors: the public pages), back / reload and the
   text-selection switch. Fields, tables, code, copy boxes, dialogs and selected text keep the browser's own menu (to copy). */
import { qs, esc } from '../lib/index.js';
import { ic_html } from '../icons/index.js';
import { auth, MODS } from '../auth/index.js';
import { key_hint } from '../feedback/index.js';
import { tip } from '../overlays/index.js';
import { PUB, PAGES } from '../site/index.js';
import { close_pops } from '../actions/index.js';

export function ctx_menu() {
  const u = auth.user, on = document.documentElement.classList.contains('allow_select'), mi = i => ic_html(i, 'h-4 w-4 text-muted');
  const item = (h, l, i) => `<a class="menu_item" role="menuitem" href="${h}">${mi(i)}${esc(l)}</a>`;
  const groups = u
    ? [['Quick links', ['tasks', 'calendar'].map(k => MODS.find(m => m.k === k)).filter(m => m && auth.can(m.k)).map(m => ['#/admin/' + m.k, m.l, m.i])]].filter(([, l]) => l.length)
    : [['Pages', [['#/', 'Home', 'home'], ...PUB.map(([k, l]) => ['#/' + k, l, PAGES[k].i]), ['#/login', 'Sign in', 'lock']]]];
  const kbd = key_hint('K') ? `<kbd class="ml-auto">${key_hint('K')}</kbd>` : '';
