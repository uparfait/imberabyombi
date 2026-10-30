/* feedback/validate.js: C. Custom validation: replaces the browser's native error bubbles. The native control stays
   the source of truth; an error is a <p class="field_err"> added at the end of its .field (or after the control)
   and removed again by clear_err(). */
import { esc, uid } from '../lib/index.js';
import { ic_html } from '../icons/index.js';
import { form_msg } from './messages.jsx';

export const field_label = el => (el.labels?.[0]?.textContent || el.placeholder || el.name || 'this field').replace(/\*/g, '').trim();
export function err_text(el) {
  const v = el.validity, l = field_label(el), lc = l.charAt(0).toLowerCase() + l.slice(1);
  if (v.valueMissing) return el.type === 'checkbox' ? 'Tick this box to continue.' : (el.tagName === 'SELECT' || el.type === 'radio') ? `Choose ${lc}.` : `Enter ${lc}.`;
  if (v.typeMismatch) return el.type === 'email' ? 'Enter an email address like name@lorem.io.' : `Enter a valid ${lc}.`;
  if (v.rangeUnderflow) return `Use ${el.min} or more.`;
  if (v.rangeOverflow) return `Use ${el.max} or less.`;
  if (v.tooShort) return `Use at least ${el.minLength} characters.`;
  if (v.badInput) return 'Enter a number.';
  if (v.patternMismatch) return `Use the format ${el.placeholder}.`;
  return el.validationMessage || 'Check this field.';
}
export function clear_err(el) { el.removeAttribute('aria-invalid'); const id = el.getAttribute('aria-describedby'); if (id?.startsWith('err_')) { document.getElementById(id)?.remove(); el.removeAttribute('aria-describedby'); } }
export function show_err(el, msg) {
  if (!el) return; clear_err(el); const id = 'err_' + (el.id || el.name || uid());
  el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', id);
  const p = document.createElement('p'); p.className = 'field_err'; p.id = id; p.innerHTML = ic_html('x', 'h-3.5 w-3.5 shrink-0') + `<span>${esc(msg)}</span>`;
  const fld = el.closest('.field, .when_wrap, .seg_field'); fld ? fld.append(p) : (el.closest('label') || el).after(p);   /* a date row's: under the row */
}
export function validate(f) {
  f.noValidate = true;
  const els = [...f.elements], bad = els.filter(el => el.willValidate && !el.disabled && el.type !== 'hidden' && !el.checkValidity());
  els.forEach(el => el.getAttribute?.('aria-invalid') && clear_err(el));
  const seen = new Set(); bad.forEach(el => { if (el.type === 'radio') { if (seen.has(el.name)) return; seen.add(el.name); } show_err(el, err_text(el)); });
  if (bad.length) { bad[0].focus(); form_msg(f, 'bad', bad.length > 1 ? `${bad.length} fields need attention` : 'One field needs attention', `Fix the highlighted field${bad.length > 1 ? 's' : ''} and try again.`, false); }
  else { const s = f.querySelector('[data-msg-slot]'); if (s?.querySelector('.msg[data-tone=bad]')) s.innerHTML = ''; }
  return !bad.length;
}
