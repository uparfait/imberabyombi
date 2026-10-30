/* sign/signer_bits.jsx: a signer's options, as a short list on their card (no icons; a tick in their colour shows what is
   on). Prepare page: Adding fields (whose fields you place now), Digital signature (Force digital signature, on or off),
   Editing (the Edit signer dialog) and Notes. Progress page: Digital signature (ticked once verified) and Notes, when they
   have them. Notes opens a small pop-up under it with the note (a .pop_fixed menu, drawn at the top of the page). */
import { createPortal } from 'react-dom';
import { ic } from '../icons/index.js';
