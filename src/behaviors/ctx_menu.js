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
  const search = `<button type="button" class="menu_item" role="menuitem" data-act="cmdk">${mi('search')}Search${kbd}</button>`;
  const head = groups.map(([g, l]) => `<p class="ctx_label">${esc(g)}</p>${l.map(x => item(...x)).join('')}`).join('');
  return `${head}<p class="ctx_label">More</p>${item('#/ui', 'Design system', 'layers')}${u ? item('#/', 'Public website', 'globe') : ''}
    ${u ? search : ''}
    <hr class="my-1"><button type="button" class="menu_item" role="menuitem" data-act="ctx_back">${mi('arrowL')}Back</button>`
    + `<button type="button" class="menu_item" role="menuitem" data-act="ctx_reload">${mi('refresh')}Reload</button>
    <hr class="my-1"><label class="menu_item justify-between" role="menuitemcheckbox" aria-checked="${on}">Allow text selection`
    + `<input type="checkbox" role="switch" data-allow-select ${on ? 'checked' : ''}></label>`;
}

function on_contextmenu(e) {
  const t = e.target;
