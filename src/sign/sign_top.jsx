/* sign/sign_top.jsx: O-Doc Sign's own top bar (its pages have no admin header or sidebar, like the document editor): Back,
   the O-Doc Sign name, then one group like the admin header's tools: the lists menu (All, Drafts,
   Waiting, Completed, Archived, To sign, each with its count: the same tile menu as the nested systems), light / dark, and the
   account menu of who is signed in. */
import { ic, i3 } from '../icons/index.js';
import { tile_menu, account_menu } from '../admin/index.js';
import { theme_btn } from '../ui/index.js';
import { to } from '../router/index.js';
import { LISTS, count } from './sign_store.js';

export const list_href = k => to(k === 'all' ? '/admin/sign' : `/admin/sign/${k}`);
const num = (n, k, c = 'ml-1.5') => <span className={`chip ${c} ${n && k === 'inbox' ? 'bg-brand text-white' : 'bg-fg/10 text-fg/70'}`}>{n}</span>;

/* each list's icon colour (fixed) */
const HUE = { all: 'orange', drafts: 'slate', waiting: 'amber', completed: 'green', archived: 'indigo', inbox: 'violet' };

/* cur: the list on show (its name and count on the button), or null on a document page ("Documents"). In the menu each
   tile has its count on a line of its own. */
export function lists_menu(cur) {
  const it = LISTS.find(x => x[0] === cur);
  return tile_menu({ id: 'pop_sign', title: 'O-Doc Sign', icon: it ? it[2] : 'file', color: it ? HUE[cur] : 'blue',
    label: it ? <>{it[1]}{num(count(cur), cur)}</> : 'Documents', set: true,
    tiles: LISTS.map(([k, l, i]) => ({ icon: i, color: HUE[k], label: <>{l}<span className="mt-1 block">{num(count(k), k, '')}</span></>, on: k === cur, href: list_href(k) })) });
}

/* back: the address Back goes to (a document page: its list), or nothing (Back: the page you came from) */
export const sign_top = (cur, back) =>
  <header className="sign_top hdr">
    {back ? <a href={back} className="icon_btn" data-tip="Back" aria-label="Back">{ic('chev_l')}</a>
    <a href={list_href('all')} className="sign_brand" aria-label="O-Doc Sign, all documents" data-tip="Online document signing and stamping">{i3('signature', 'h-10 w-10', 'violet')}
      <span className="font-display text-lg font-semibold">O-Doc Sign</span></a>
    <div className="sign_btns">
      <div className="link_group sign_tools"><nav className="min-w-0" aria-label="O-Doc Sign lists">{lists_menu(cur)}</nav>
        {theme_btn()}{account_menu('_sign')}</div></div>
  </header>;
