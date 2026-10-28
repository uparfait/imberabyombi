/* header_tools.jsx: the dashboard's header tools (search, design system, theme, account). Full-screen staff pages reuse
   them; n is an id suffix so their menus stay unique. */
import { ic } from '../icons/index.js';
import { db } from '../store/index.js';
import { cfg } from '../config/index.js';
import { auth } from '../auth/index.js';
