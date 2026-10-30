/* sign/signer_side.jsx: the signing page's guide (beside the document): who asks and as whom you sign (once you have
   signed: "Signed on" with a green tick; when you sign with a digital certificate: a word about it first; Download a copy
   as soon as anyone has signed), the sender's note for you, your progress with Next field and Finish, and the agreement shown before you sign. */
import { ic, i3 } from '../icons/index.js';
import { KINDS, when } from './sign_store.js';
import { own_fields, left_of } from './signer_state.js';

const next_text = left => left.length
  ? `${left.length} field${left.length > 1 ? 's' : ''} left · next: ${KINDS[left[0].type][0].toLowerCase()}` : 'All your fields are filled';
const bar = d => { const n = own_fields(d).length, k = n - left_of(d).length;
  return <div className="sign_prog mt-3" role="progressbar" aria-label="Your fields" aria-valuemin={0} aria-valuemax={n} aria-valuenow={k}>
    <i style={{ width: `${n ? k / n * 100 : 0}%` }}></i></div>; };

export const request_card = (d, r) => <section className="card p-5">
  <div className="flex items-center gap-3">{i3('signature', 'h-11 w-11', 'violet')}<div className="min-w-0">
    <p className="truncate font-display text-lg leading-tight">{d.title}</p><p className="truncate text-xs text-muted">Signing request from {d.owner_name}</p></div></div>
  <p className="mt-3 flex items-center gap-2 text-sm">{ic('user', 'h-4 w-4 shrink-0 text-muted')}<span className="min-w-0 truncate">Signing as <b className="font-medium">{r.name}</b>
    <span className="text-muted"> ({r.email})</span></span></p>
  {r.status === 'signed' ? <p className="mt-2 flex items-center gap-2 text-sm font-medium text-ok">{ic('check', 'h-4 w-4 shrink-0')}Signed on {when(r.signed_at)}</p>
    : d.status !== 'sent' ? <p className="mt-2 flex items-center gap-2 text-sm text-muted">{ic('clock', 'h-4 w-4 shrink-0')}No longer open for signing</p>
    : r.cert ? <p className="mt-2 flex items-center gap-2 text-sm">{ic('shield', 'h-4 w-4 shrink-0 text-muted')}You sign with your digital certificate and its password</p>
    : null}
  {/* a copy as soon as anyone has signed: the signatures given so far are shared; empty places are not drawn */}
  {d.recipients.some(x => x.status === 'signed') ? <button type="button" className="btn btn_outline btn_sm mt-4 w-full" data-act="sign_dl" data-id={d.id}>

export const note_card = (d, r) => r.note ? <section className="card sign_note_card p-5"><h2 className="sign_cap">Note from {d.owner_name}</h2>
  <p className="mt-2 whitespace-pre-line text-sm">{r.note}</p></section> : null;

export const steps_card = d => { const left = left_of(d);
  return <section className="card p-5"><h2 className="sign_cap">Your fields</h2>
    <p className={`text-sm ${left.length ? 'text-muted' : 'font-medium text-ok'}`}>{next_text(left)}</p>{bar(d)}
    <div className="mt-4 grid gap-2">
      <button type="button" className="btn btn_outline btn_sm" data-act="sign_next" disabled={!left.length}>{ic('arrow_downward', 'h-4 w-4')}Next field</button>
      <button type="button" className="btn btn_primary btn_sm" data-act="sign_finish" disabled={!!left.length}>{ic('signature', 'h-4 w-4')}Finish and sign</button></div></section>; };

export const agree_body = (d, r) => <div className="grid gap-4 sm:col-span-2">
  <p className="text-sm text-muted">Your marks go on “{d.title}”. Your name, email and the time are recorded with your signature, and{' '}
    {d.owner_name} sees that you signed.</p>
  <label className="sign_agree"><input type="checkbox" name="agree" required />
    <span className="text-sm">I, {r.name}, agree to sign this document electronically, with the same effect as a handwritten signature.</span></label></div>;
