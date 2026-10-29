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
