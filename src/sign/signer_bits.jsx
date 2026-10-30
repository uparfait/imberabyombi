/* sign/signer_bits.jsx: a signer's options, as a short list on their card (no icons; a tick in their colour shows what is
   on). Prepare page: Adding fields (whose fields you place now), Digital signature (Force digital signature, on or off),
   Editing (the Edit signer dialog) and Notes. Progress page: Digital signature (ticked once verified) and Notes, when they
   have them. Notes opens a small pop-up under it with the note (a .pop_fixed menu, drawn at the top of the page). */
import { createPortal } from 'react-dom';
import { ic } from '../icons/index.js';
import { closed_pop } from '../admin/index.js';
import { when } from './sign_store.js';

/* what "Force digital signature" asks of a signer (its help icon and the row's tooltip) */
export const CERT_HELP = 'The signer must verify their identity with a digital certificate (the certificate file and its password) before they '
  + 'can sign or stamp.';

/* one row: a button when it does something (a: its data-act and other attributes), else plain text; tick: a ✓ at its end */
const row = (label, tick, a = {}, end = null) => { const Tag = a['data-act'] ? 'button' : 'div';
  return <Tag className="sign_opt" {...(Tag === 'button' ? { type: 'button' } : {})} {...a}><span className="min-w-0 truncate">{label}</span>
    {end || (tick ? ic('check', 'sign_opt_tick h-4 w-4 shrink-0') : null)}</Tag>; };
const notes = r => <>{row('Notes', false, { 'data-act': 'pop', 'data-pop': `pop_note_${r.id}`, 'aria-haspopup': 'dialog' },
  ic('chev_d', 'sign_chev h-4 w-4 shrink-0'))}
