/* feedback/messages.jsx: B. Inline messages. msg_box() is the JSX box; show_msg() fills a message slot (an element
   React renders EMPTY on purpose, e.g. <div data-msg-slot className="empty:hidden" />) with the same box as HTML. */
import { ic, ic_html } from '../icons/index.js';
import { TICON } from './basics.js';

/* B. Inline messages (title, text: JSX or text) */
export const msg_box = (tone, title, text = '') => (
  <div className="msg" data-tone={tone} role={tone === 'bad' ? 'alert' : 'status'}>{ic(TICON[tone] || 'help', 'ico h-5 w-5')}<div className="min-w-0 flex-1"><p className="font-semibold">{title}</p>{text ? <p className="mt-0.5 text-muted">{text}</p> : null}</div><button type="button" className="msg_x" data-act="msg_x" aria-label="Dismiss message">{ic('x', 'h-4 w-4')}</button></div>
