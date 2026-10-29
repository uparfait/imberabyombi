/* sign/sign_top.jsx: O-Doc Sign's own top bar (its pages have no admin header or sidebar, like the document editor): Back,
   the O-Doc Sign name, the lists menu (All, Drafts, Waiting, Completed, To sign, each with its count: the same tile menu
   as the nested systems), the page's buttons, light / dark, and who is signed in. */
import { ic, i3 } from '../icons/index.js';
import { tile_menu } from '../admin/index.js';
import { theme_btn, avatar } from '../ui/index.js';
import { to } from '../router/index.js';
import { LISTS, count, who } from './sign_store.js';

export const list_href = k => to(k === 'all' ? '/admin/sign' : `/admin/sign/${k}`);
const num = (n, k, c = 'ml-1.5') => <span className={`chip ${c} ${n && k === 'inbox' ? 'bg-brand text-white' : 'bg-fg/10 text-fg/70'}`}>{n}</span>;

/* cur: the list on show (its name and count on the button), or null on a document page ("Documents"). In the menu each
   tile has its count on a line of its own. */
export function lists_menu(cur) {
  const it = LISTS.find(x => x[0] === cur);
  return tile_menu({ id: 'pop_sign', title: 'O-Doc Sign', icon: it ? it[2] : 'file', label: it ? <>{it[1]}{num(count(cur), cur)}</> : 'Documents', set: true,
    tiles: LISTS.map(([k, l, i]) => ({ icon: i, label: <>{l}<span className="mt-1 block">{num(count(k), k, '')}</span></>, on: k === cur, href: list_href(k) })) });
}

/* back: the address Back goes to (a document page: its list), or nothing (Back: the page you came from) */
export const sign_top = (cur, back, btns) => { const me = who();
  return <header className="sign_top">
    {back ? <a href={back} className="icon_btn" data-tip="Back" aria-label="Back">{ic('arrow_back')}</a>
