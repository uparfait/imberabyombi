/* sign/signer_page.jsx: signing a document sent to you (/admin/sign/sign/<id>, also the link the sender copies): the pages
   with your fields to fill, and the guide (signer_side.jsx). You see only your own part: not the other signers, and of
   their fields only what they have already signed. The first opening is recorded. Signed already, or no longer open: it
   says so and shows the marks. Not sent to you: it says which email can sign it. */
import { ic } from '../icons/index.js';
import { empty } from '../ui/index.js';
import { to } from '../router/index.js';
import { my_rec, who, log, save_doc, when } from './sign_store.js';
