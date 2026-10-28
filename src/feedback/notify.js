/* feedback/notify.js: A. Bottom-right notifications (#toasts, cloned from <template id="tpl_toast">) on staff pages,
   the same message inline elsewhere (inline_note), and the message a form leaves for the next page (notify_next). */
import { qs, esc } from '../lib/index.js';
import { ic_html } from '../icons/index.js';
import { reduced, TICON, TTITLE, staff_page } from './basics.js';
import { show_msg, slot_of, new_slot } from './messages.jsx';

export function inline_note(text, tone = 'ok', title) {
  const at = document.activeElement?.closest?.('form, section, article') || qs('#main'); if (!at) return;
  const slot = at.matches('form') ? slot_of(at) : at.querySelector(':scope > [data-msg-slot]') || new_slot(at);
  show_msg(slot, tone, esc(title || TTITLE[tone] || TTITLE.ok), esc(text));
  const r = slot.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) slot.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
/* A message for the page a form goes to next (sign in, sign out, verified, password saved): shown once that page is drawn */
export let NEXT_MSG = null;
