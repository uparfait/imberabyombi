/* emails/mail_body.jsx: one email's subject (s, text) and body (t, JSX) for a MAILS key. The parts several mails
   share (event card, RSVP buttons, calendar links) are built here; the six bodies live in event_mails / account_mails. */
import { ic } from '../icons/index.js';
import { lorem, hash_str, add_d, fmt_time, zone_short, page_tz, ymd } from '../lib/index.js';
import { mail_btn, mail_date } from './mails.jsx';
import { event_mails } from './event_mails.jsx';
import { account_mails } from './account_mails.jsx';
import { to } from '../router/index.js';

export function mail_body(k) {
  lorem.seed(hash_str('mail-' + k));
  const ev = lorem.t(3), place = `${lorem.t(2)} hall, ${lorem.t(1)}`, who = lorem.name(), d1 = add_d(new Date(), 9), d2 = add_d(new Date(), 12);
  const tm = (a, b) => `${fmt_time(a)} – ${fmt_time(b)} (${zone_short(page_tz(), ymd(d1))})`;   /* the time zone goes with every time */
  const event = (d, strike) => (
    <div className="mail_event">{mail_date(d, strike)}<div className="min-w-0"><p className="font-medium">{ev}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">{ic('clock', 'h-4 w-4 shrink-0')}
        {d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}, {tm('14:00', '16:30')}</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">{ic('pin', 'h-4 w-4 shrink-0')}{place}</p></div></div>
