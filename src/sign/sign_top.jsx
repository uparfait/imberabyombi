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
