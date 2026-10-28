/* lib/text.js: TINY UTILITIES for text, lists and ids: escape HTML, pad, capitalise, unique lists, ids, string hashes
   and money in the configured currency. */
import { cfg } from '../config/index.js';

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const pad = n => String(n).padStart(2, '0');
export const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
export const uniq = a => [...new Set(a.filter(Boolean))];
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
export const hash_str = s => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
