/* feedback/messages.jsx: B. Inline messages. msg_box() is the JSX box; show_msg() fills a message slot (an element
   React renders EMPTY on purpose, e.g. <div data-msg-slot className="empty:hidden" />) with the same box as HTML. */
import { ic, ic_html } from '../icons/index.js';
import { TICON } from './basics.js';

/* B. Inline messages (title, text: JSX or text) */
export const msg_box = (tone, title, text = '') => (
  <div className="msg" data-tone={tone} role={tone === 'bad' ? 'alert' : 'status'}>{ic(TICON[tone] || 'help', 'ico h-5 w-5')}<div className="min-w-0 flex-1"><p className="font-semibold">{title}</p>{text ? <p className="mt-0.5 text-muted">{text}</p> : null}</div><button type="button" className="msg_x" data-act="msg_x" aria-label="Dismiss message">{ic('x', 'h-4 w-4')}</button></div>
);
/* the same box as an HTML string (title, text: trusted HTML; escape user text with esc()) */
export const msg_box_html = (tone, title, text = '') => `<div class="msg" data-tone="${tone}" role="${tone === 'bad' ? 'alert' : 'status'}">${ic_html(TICON[tone] || 'help', 'ico h-5 w-5')}<div class="min-w-0 flex-1"><p class="font-semibold">${title}</p>${text ? `<p class="mt-0.5 text-muted">${text}</p>` : ''}</div><button type="button" class="msg_x" data-act="msg_x" aria-label="Dismiss message">${ic_html('x', 'h-4 w-4')}</button></div>`;
export function show_msg(slot, tone, title, text, autohide = tone === 'ok') {
  if (!slot) return; slot.innerHTML = msg_box_html(tone, title, text); const m = slot.firstElementChild;
  if (autohide) setTimeout(() => { if (!slot.contains(m)) return; m.classList.add('msg_out'); setTimeout(() => m.remove(), 300); }, 7000);
}
/* A new slot at the top of a form or section that has none (as in the reference). Views should render their own empty
   [data-msg-slot]; React leaves this extra first child alone. */
export const new_slot = at => { const s = document.createElement('div'); s.dataset.msgSlot = ''; s.className = 'mb-4'; at.prepend(s); return s; };
