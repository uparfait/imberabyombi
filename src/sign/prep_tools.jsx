/* sign/prep_tools.jsx: the prepare page's tools, its right column (Send for signing, or Finish once everyone has signed;
   Save; Sign it myself, self_sign.jsx; "Placing for": whose fields, you as "You"; the field tools, which add a field on
   click or drop one where they are dragged; what is placed so far; at its foot, Preview once someone has signed). */
import { ic } from '../icons/index.js';
import { KINDS, rec_of, send_block } from './sign_store.js';
import { P } from './prep_state.js';
import { help_tip } from '../ui/index.js';

const tool = (type, c = '') => { const [l, i] = KINDS[type];
  return <button key={type} type="button" className={`sign_tool ${c}`} data-act="sign_tool" data-type={type} draggable
    onDragStart={e => { e.dataTransfer.setData('text/sign-field', type); e.dataTransfer.effectAllowed = 'copy'; }}
    aria-label={`Add a ${l.toLowerCase()} field`}>{ic(i, 'h-5 w-5 shrink-0')}<span>{l}</span></button>; };

const placing = d => d.recipients.length
  ? <div className="grid gap-1.5" role="radiogroup" aria-label="Placing for">{d.recipients.map(r =>
    <button key={r.id} type="button" role="radio" aria-checked={P.rid === r.id} className={`sign_for ${P.rid === r.id ? 'on' : ''}`}
      style={{ '--c': r.color }} data-act="sign_rid" data-id={r.id}><span className="truncate">{r.name}</span>{P.rid === r.id ? ic('check', 'ml-auto h-4 w-4 shrink-0 sign_for_tick') : null}</button>)}</div>
  : <p className="sign_hint">Add a signer first (on the left).</p>;

const placed = d => { const n = d.fields.length;
  return n ? <ul className="grid gap-1 text-sm">{d.recipients.map(r => { const k = d.fields.filter(f => f.rid === r.id).length;
    return <li key={r.id} className="flex items-center gap-2"><span className="sign_dot sm" style={{ background: r.color }}></span>
      <span className="min-w-0 flex-1 truncate">{r.name}</span><span className={k ? 'text-muted' : 'text-warn'}>{k || 'none yet'}</span></li>; })}</ul>
    : <p className="text-sm text-muted">No fields yet.</p>; };

/* a column caption with its help icon: the description shows on hover, focus or tap */
const cap = (t, help) => <div className="sign_cap_row"><h2 className="sign_cap">{t}</h2>{help_tip(help, t.toLowerCase())}</div>;

export const prep_tools = d => <div className="sign_panel">
  <section className="grid gap-2" aria-label="Send">
    {(why => <span className="sign_send_wrap" data-tip={why || undefined}>
      <button type="button" className="btn btn_primary btn_sm w-full" data-act="sign_send" disabled={!!why}>{ic('send', 'h-4 w-4')}Send for signing</button></span>)(send_block(d))}
    <button type="button" className="btn btn_outline btn_sm w-full" data-act="sign_save">{ic('check', 'h-4 w-4')}Save draft</button></section>
  <section aria-label="Placing for">{cap('Placing for', 'The signer whose fields you place now. Pick another signer to place theirs; '
    + 'each signer has a colour, and their fields on the page show it.')}{placing(d)}</section>
  <section aria-label="Fields">{cap('Fields', 'Click a field to add it to the page on screen, or drag it onto the page. Drag a field '
    + 'to move it and its corner to resize it. Arrow keys nudge the selected field; Delete removes it.')}<div className="grid gap-2">{tool('signature')}{tool('stamp')}</div></section>
  <section aria-label="Placed">{cap('Placed', 'How many fields each signer has on the document. Every signer needs at least one '
    + 'before you can send it.')}{placed(d)}</section>
</div>;

