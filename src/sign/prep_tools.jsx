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
    <button key={r.id} type="button" role="radio" aria-checked={P.rid === r.id} className={`sign_for ${P.rid === r.id ? 'on' : ''}`}
      style={{ '--c': r.color }} data-act="sign_rid" data-id={r.id}><span className="sign_dot sm" style={{ background: r.color }}></span>
      <span className="truncate">{r.name}</span></button>)}</div>
  : <p className="sign_hint">Add a signer first (on the left).</p>;

const placed = d => { const n = d.fields.length;
  return n ? <ul className="grid gap-1 text-sm">{d.recipients.map(r => { const k = d.fields.filter(f => f.rid === r.id).length;
    return <li key={r.id} className="flex items-center gap-2"><span className="sign_dot sm" style={{ background: r.color }}></span>
      <span className="min-w-0 flex-1 truncate">{r.name}</span><span className={k ? 'text-muted' : 'text-warn'}>{k || 'none yet'}</span></li>; })}</ul>
    : <p className="text-sm text-muted">No fields yet.</p>; };
