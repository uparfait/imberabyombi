/* emails/mails.jsx: Email designs: how system emails look in the brand (invite, update, time change, reset link,
   code, access token). MAILS lists them (label + icon); mail_btn and mail_date are parts every mail shares. */

export const MAILS = {
  invite: { l: 'Event invite', i: 'calendar' }, update: { l: 'Event update', i: 'edit' }, change: { l: 'Time change', i: 'clock' },
  reset: { l: 'Password reset', i: 'lock' }, code: { l: 'Sign-in code', i: 'shield' }, token: { l: 'Access token', i: 'key' }
};
export const mail_btn = (l, c = 'btn_primary', href = '#/admin/emails') => <a href={href} className={`btn ${c}`}>{l}</a>;
/* a calendar tile: month, day, weekday; strike = the old date of a moved event */
