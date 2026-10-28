/* feedback/validate.js: C. Custom validation: replaces the browser's native error bubbles. The native control stays
   the source of truth; an error is a <p class="field_err"> added at the end of its .field (or after the control)
   and removed again by clear_err(). */
import { esc, uid } from '../lib/index.js';
import { ic_html } from '../icons/index.js';
import { form_msg } from './messages.jsx';

export const field_label = el => (el.labels?.[0]?.textContent || el.placeholder || el.name || 'this field').replace(/\*/g, '').trim();
export function err_text(el) {
  const v = el.validity, l = field_label(el), lc = l.charAt(0).toLowerCase() + l.slice(1);
