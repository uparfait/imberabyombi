/* actions/open_cmd.jsx: the "Go to" command palette (Ctrl + K in the admin): every module the user may open, the public
   website, the design system and every public page, filtered as you type ([data-filter=".cmd_item"]). */
import { ic } from '../icons/index.js';
import { MODS, auth } from '../auth/index.js';
import { PUB, PAGES } from '../site/index.js';
import { search_box } from '../ui/index.js';
