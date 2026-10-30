/* sign/sign_top.jsx: O-Doc Sign's own top bar (its pages have no admin header or sidebar, like the document editor): Back,
   the O-Doc Sign name, then one group like the admin header's tools: the lists menu (All, Drafts,
   Waiting, Completed, Archived, To sign, each with its count: the same tile menu as the nested systems), light / dark, and the
   account menu of who is signed in. */
import { ic, i3 } from '../icons/index.js';
import { tile_menu, account_menu } from '../admin/index.js';
import { theme_btn } from '../ui/index.js';
import { to } from '../router/index.js';
