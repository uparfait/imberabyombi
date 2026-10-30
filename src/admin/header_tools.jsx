/* header_tools.jsx: the dashboard's header tools (search, design system, theme, account). Full-screen staff pages reuse
   them, or just account_menu() (O-Doc Sign's top bar); n is an id suffix so their menus stay unique. */
import { ic } from '../icons/index.js';
import { db } from '../store/index.js';
import { cfg } from '../config/index.js';
import { auth } from '../auth/index.js';
import { avatar, theme_btn } from '../ui/index.js';
import { key_hint } from '../feedback/index.js';
import { closed_pop } from './live_slot.jsx';
import { to } from '../router/index.js';

export const header_tools = (n = '') => <><button className="icon_btn" data-act="cmdk" aria-label={`Search${key_hint('K') ? ` (${key_hint('K')})` : ''}`}>{ic('search')}</button>
  <a className="icon_btn hidden sm:inline-grid" href={to('/ui')} aria-label="Design system">{ic('layers')}</a>
  {theme_btn()}{account_menu(n)}</>;
