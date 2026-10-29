/* sign/signer_page.jsx: signing a document sent to you (/admin/sign/sign/<id>, also the link the sender copies): the pages
   with your fields to fill and the others' places, and the guide (signer_side.jsx). The first opening is recorded.
   Signed already, or no longer open: it says so and shows the marks. Not sent to you: it says which email can sign it. */
import { ic } from '../icons/index.js';
import { empty } from '../ui/index.js';
import { to } from '../router/index.js';
import { my_rec, who, log, save_doc, when } from './sign_store.js';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { use_marks } from './use_marks.js';
import { S, signer_start } from './signer_state.js';
import { request_card, note_card, steps_card, signer_bar } from './signer_side.jsx';
import { signer_rows } from './owner_page.jsx';

function Sign_doc({ d, me, done }) {
  const marks = use_marks(d.id, d.updated);
  return <Pdf_pages doc={d} layer={i => fields_on(d, i, { mode: done ? 'view' : 'sign', marks, pending: done ? null : S.pending, me })} />;
}

const not_yours = d => <div className="sign_main page_enter max-w-2xl"><div className="card">
  {empty('This document was not sent to you', `“${d.title}” waits for other signers. To sign it, sign in with the email address it was sent to.`,
