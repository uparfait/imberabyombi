/* sign/prep_tools.jsx: the prepare page's tools, its right column (Send for signing and Save; "Placing for": whose
   fields; the field tools, which add a field on click or drop one where they are dragged; what is placed so far). */
import { ic } from '../icons/index.js';
import { KINDS, rec_of } from './sign_store.js';
import { P } from './prep_state.js';
import { help_tip } from '../ui/index.js';

const tool = (type, c = '') => { const [l, i] = KINDS[type];
  return <button key={type} type="button" className={`sign_tool ${c}`} data-act="sign_tool" data-type={type} draggable
    onDragStart={e => { e.dataTransfer.setData('text/sign-field', type); e.dataTransfer.effectAllowed = 'copy'; }}
    aria-label={`Add a ${l.toLowerCase()} field`}>{ic(i, 'h-5 w-5 shrink-0')}<span>{l}</span></button>; };

const placing = d => d.recipients.length
  ? <div className="grid gap-1.5" role="radiogroup" aria-label="Placing for">{d.recipients.map(r =>
