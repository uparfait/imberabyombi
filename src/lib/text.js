/* lib/text.js: TINY UTILITIES for text, lists and ids: escape HTML, pad, capitalise, unique lists, ids, string hashes
   and money in the configured currency. */
import { cfg } from '../config/index.js';

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const pad = n => String(n).padStart(2, '0');
export const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
