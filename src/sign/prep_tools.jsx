/* sign/prep_tools.jsx: the prepare page's tools. Desktop: a right column ("Placing for": whose fields; the field tools,
   which add a field on click or drop one where they are dragged; what is placed so far). Phones: a bar at the bottom
   with the signer (it opens the signers' sheet) and the tools. */
import { ic } from '../icons/index.js';
import { KINDS, rec_of } from './sign_store.js';
import { P } from './prep_state.js';

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

export const prep_tools = d => <div className="sign_panel">
  <section aria-label="Placing for"><h2 className="sign_cap">Placing for</h2>{placing(d)}</section>
  <section aria-label="Fields"><h2 className="sign_cap">Fields</h2><div className="grid gap-2">{tool('signature')}{tool('stamp')}</div>
    <p className="mt-3 text-xs leading-relaxed text-muted">Click a field to add it to the page on screen, or drag it onto the page.
      Drag a field to move it and its corner to resize it. Arrow keys nudge the selected field; Delete removes it.</p></section>
  <section aria-label="Placed"><h2 className="sign_cap">Placed</h2>{placed(d)}</section>
