/* sign/prep_panel.jsx: the prepare page's left column: the document's title and file,
   its signers (pick one to place their fields; Edit signer and Remove; a Note chip that opens their note and a chip when
   they must sign with a digital certificate; each card is tinted with the signer's colour, from their email) and the
   form that adds a
   signer: name, email and a note for them. People already in the system are suggested as you type a name. Once there is
   a signer the form folds into an "Add signer" button; Save adds the signer and folds it again, Cancel just folds it. */
import { ic } from '../icons/index.js';
import { db, rerender } from '../store/index.js';
import { validate, notify } from '../feedback/index.js';
import { initials } from '../ui/index.js';
import { add_rec, size_of } from './sign_store.js';
import { P, prep_dirty } from './prep_state.js';
import { status_chip } from './sign_list.jsx';
