/* sign/sign_fields.jsx: the fields drawn over a page, in the three ways a document is seen. Positions are fractions of the
   page (left, top, width, height), so a field keeps its place at any width.
   edit: the owner places them (dashed, in the signer's colour, their name on a tag, x to remove, a corner to resize; one
   already signed, by the owner signing their own draft, shows its mark and stays where it is);
   sign: the signer's own fields are buttons (to do: pulsing; done: their mark) and the others say who signs there;
   view: every mark placed so far, and a dashed box for each one still to come. */
import { ic } from '../icons/index.js';
import { KINDS, rec_of, shown } from './sign_store.js';

export const at = f => ({ left: `${f.x * 100}%`, top: `${f.y * 100}%`, width: `${f.w * 100}%`, height: `${f.h * 100}%` });
const look = (f, r) => ({ ...at(f), '--c': r?.color || '#94A3B8' });

const edit_field = (d, f, sel, marks) => { const r = rec_of(d, f.rid), [l, i] = KINDS[f.type];
  if (f.done && marks?.[f.id]) return <div key={f.id} className="sf sf_final" data-fid={f.id} style={look(f, r)}><img src={marks[f.id]} alt={`${l} by ${shown(r)}`} /></div>;
  return <div key={f.id} className={`sf sf_edit ${sel === f.id ? 'sel' : ''}`} data-fid={f.id} style={look(f, r)} tabIndex={0}
    aria-label={`${l} field for ${r?.name || 'nobody'}`}>
    <span className="sf_tag">{shown(r) || 'Unassigned'}</span>{ic(i, 'sf_ic')}<span className="sf_l">{l}</span>
    <button type="button" className="sf_x" data-act="sign_field_del" data-id={f.id} aria-label={`Remove this ${l.toLowerCase()} field`}>{ic('x')}</button>
    <i className="sf_rs" aria-hidden="true"></i></div>; };

/* o = { mode: 'edit' | 'sign' | 'view', sel (edit), marks (saved), pending (signer's, not sent yet), me (signer's id) } */
export const fields_on = (d, page, o) => d.fields.filter(f => f.page === page).map(f => {
  if (o.mode === 'edit') return edit_field(d, f, o.sel);
  const r = rec_of(d, f.rid), [l, i] = KINDS[f.type], v = o.pending?.[f.id] || o.marks?.[f.id];
  if (o.mode === 'sign' && f.rid === o.me) return <button key={f.id} type="button" className={`sf ${v ? 'sf_done' : 'sf_todo'}`} data-fid={f.id}
    data-act="sign_fill" data-id={f.id} style={look(f, r)} aria-label={v ? `Change your ${l.toLowerCase()}` : `Add your ${l.toLowerCase()}`}>
    {v ? <img src={v} alt={`Your ${l.toLowerCase()}`} /> : <>{ic(i, 'sf_ic')}<span className="sf_l">{l}</span></>}</button>;
  if (v) return <div key={f.id} className="sf sf_final" data-fid={f.id} style={look(f, r)}><img src={v} alt={`${l} by ${r?.name}`} /></div>;
  /* someone signing (o.me) sees only their own fields and what others have already signed, not where others still sign */
  return o.me ? null : <div key={f.id} className="sf sf_wait" data-fid={f.id} style={look(f, r)}><span className="sf_l">{l} · {r?.name}</span></div>;
});
