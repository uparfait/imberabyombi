/* actions/open_cmd.jsx: the "Go to" command palette (Ctrl + K in the admin): every module the user may open, the public
   website, the design system and every public page, filtered as you type ([data-filter=".cmd_item"]). */
import { ic } from '../icons/index.js';
import { MODS, auth } from '../auth/index.js';
import { PUB, PAGES } from '../site/index.js';
import { search_box } from '../ui/index.js';
import { modal } from '../overlays/index.js';

export function open_cmd() {
  const items = [...MODS.filter(m => auth.can(m.k)).map(m => [`#/admin/${m.k}`, m.l, m.i]), ['#/', 'Public website', 'globe'], ['#/ui', 'Design system', 'layers'], ...PUB.map(([k, l]) => [`#/${k}`, `${l} page`, PAGES[k].i])];
  modal({ title: 'Go to', body: (
    <div className="sm:col-span-2">
      {search_box({ 'data-filter': '.cmd_item', 'data-cmd': '', autoFocus: true }, 'Type a module or page name')}
      <ul className="mt-3 grid max-h-[50dvh] gap-1 overflow-y-auto">{items.map(([h, l, i]) => <li className="cmd_item" key={h}><button className="menu_item py-2.5" data-act="go" data-href={h}>{ic(i, 'h-4 w-4 text-muted')}{l}</button></li>)}</ul>
      <p className="mt-3 text-xs text-muted">Tip: press <kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere in the admin.</p>
    </div>
  ) });
}
