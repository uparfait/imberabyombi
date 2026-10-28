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
export const notify_next = (text, tone = 'ok', title) => { NEXT_MSG = [text, tone, title]; };
export function show_next() {
  if (!NEXT_MSG) return; const [text, tone, title] = NEXT_MSG; NEXT_MSG = null;
  if (staff_page()) return notify(text, tone, title);
  const slot = qs('#main [data-msg-slot]'); slot ? show_msg(slot, tone, esc(title || TTITLE[tone] || TTITLE.ok), esc(text)) : inline_note(text, tone, title);
}

/* A. Bottom-right notification (pauses on hover, max 4 stacked). Staff pages only, see above. */
export function notify(text, tone = 'ok', title) {
  if (!staff_page()) return inline_note(text, tone, title);
  const host = qs('#toasts'), tpl = qs('#tpl_toast'); if (!host || !tpl) return;
  const n = tpl.content.firstElementChild.cloneNode(true), life = tone === 'bad' ? 7000 : 4500;
  n.dataset.tone = tone; n.setAttribute('role', tone === 'bad' ? 'alert' : 'status'); n.style.setProperty('--life', life + 'ms');
  n.querySelector('[data-ico]').innerHTML = ic_html(TICON[tone] || 'check', 'h-4 w-4');
  n.querySelector('[data-title]').textContent = title || TTITLE[tone] || TTITLE.ok;
  n.querySelector('[data-msg]').textContent = text;
  let left = life, t0 = 0, tm;
