/* emails/event_mails.jsx: the event emails: invite (RSVP, meeting link, calendar links), update (what changed)
   and time change (old date struck through, new date). It gets the shared parts mail_body() built for this mail. */
import { Fragment } from 'react';
import { ic } from '../icons/index.js';
import { lorem } from '../lib/index.js';
import { copy_box } from '../overlays/index.js';
import { mail_btn, mail_date } from './mails.jsx';

export const event_mails = ({ ev, place, who, d1, d2, tm, event, rsvp, cal }) => ({
  invite: { s: `Invitation: ${ev}`, t: <>
    <h1 className="mail_h">You are invited</h1><p>{who} invited you to <b>{ev}</b>. {lorem.s()}</p>{event(d1)}{rsvp}
    <p className="text-sm font-medium">Join online</p>{copy_box('https://meet.imberabyombi.com/' + lorem.w(1) + '-' + lorem.int(100, 999), 'Meeting link')}{cal}</> },
  update: { s: `Updated: ${ev}`, t: <>
