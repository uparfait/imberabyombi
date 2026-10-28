/* editor/content/comment_cards.js: the comment cards in #comment_list (rendered empty by the chrome, filled here) in
   the order of their text in the page: draft (Comment / Cancel, Ctrl+Enter saves), saved (Resolve, Delete, replies). */
import { ic_html } from '../../icons/index.js';
import { qs, qsa, el, toast, state, pages_el, save_soon } from '../core/index.js';
import { remove_comment, activate_comment, fmt_time } from './comments.js';

const icon_btn = (x, tip, icon, cls) => `<button type="button" class="icon_btn h-7 w-7" data-x="${x}" data-tip="${tip}" aria-label="${tip}">`
