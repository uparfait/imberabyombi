/* sign/signer_page.jsx: signing a document sent to you (/admin/sign/sign/<id>, also the link the sender copies): the pages
   with your fields to fill, and the guide (signer_side.jsx). You see only your own part: not the other signers, and of
   their fields only what they have already signed. The first opening is recorded. Signed already, or no longer open: it
   says so in the guide and shows the marks. Not sent to you: it says which email can sign it. Your own draft, when you
   sign it yourself (self_sign.jsx): the same steps, before it is sent. */
import { empty } from '../ui/index.js';
import { to } from '../router/index.js';
import { my_rec, who, log, save_doc } from './sign_store.js';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { use_marks } from './use_marks.js';
import { S, signer_start } from './signer_state.js';
import { request_card, note_card, steps_card } from './signer_side.jsx';

function Sign_doc({ d, me, done }) {
  const marks = use_marks(d.id, d.updated);
  return <Pdf_pages doc={d} layer={i => fields_on(d, i, { mode: done ? 'view' : 'sign', marks, pending: done ? null : S.pending, me })} />;
}

const not_yours = d => <div className="sign_main page_enter max-w-2xl"><div className="card">
  {empty('This document was not sent to you', `“${d.title}” waits for other signers. To sign it, sign in with the email address it was sent to.`,
    d.owner === who().email ? <a href={to(`/admin/sign/doc/${d.id}`)} className="btn btn_primary btn_sm">Open its progress page</a> : null)}</div></div>;

export function signer_page(d) {
  const r = my_rec(d); if (!r) return not_yours(d);
  signer_start(d.id);
  if (!r.viewed_at && d.status === 'sent') { r.viewed_at = Date.now(); log(d, `${r.name} opened the document`, 'open', r.email); save_doc(d); }
  const done = r.status === 'signed' || d.status !== 'sent';
  return <div className="sign_split">
    <aside className="sign_side" aria-label="Signing">{request_card(d, r)}{note_card(d, r)}
      {done ? null : steps_card(d)}</aside>
    <section className="sign_center" aria-label="Pages">
      <Sign_doc d={d} me={r.id} done={done} /></section>
  </div>;
}
