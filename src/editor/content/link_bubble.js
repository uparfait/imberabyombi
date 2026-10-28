/* editor/content/link_bubble.js: the bubble under a link at the caret (#link_bubble, rendered by the chrome: the
   address #lb_url, Copy #lb_copy, Edit #lb_edit, Remove #lb_remove). The engine fills and places it. */
import { rem } from '../../lib/index.js';
import { qs, clamp, toast, last_range } from '../core/index.js';
import { link_at_caret, open_link_dialog, remove_link } from './links.jsx';

export let bubble_link = null;
export const link_bubble = () => qs('#link_bubble');
