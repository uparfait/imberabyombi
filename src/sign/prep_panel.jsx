/* sign/prep_panel.jsx: the prepare page's left column (a sheet that slides up on phones): the document's title and file,
   its signers (pick one to place their fields; each shows their note, with Edit note and Remove) and the form that adds a
   signer: name, email and a note for them. People already in the system are suggested as you type a name. */
import { ic } from '../icons/index.js';
import { db, rerender } from '../store/index.js';
import { validate, notify } from '../feedback/index.js';
import { initials } from '../ui/index.js';
import { add_rec, size_of } from './sign_store.js';
import { P, prep_dirty } from './prep_state.js';
