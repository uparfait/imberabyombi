/* sign/sign_top.jsx: O-Doc Sign's own top bar (its pages have no admin header or sidebar, like the document editor): Back,
   the O-Doc Sign name, the lists menu (All, Drafts, Waiting, Completed, To sign, each with its count: the same tile menu
   as the nested systems), the page's buttons, light / dark, and who is signed in. */
import { ic, i3 } from '../icons/index.js';
import { tile_menu } from '../admin/index.js';
import { theme_btn, avatar } from '../ui/index.js';
import { to } from '../router/index.js';
import { LISTS, count, who } from './sign_store.js';
