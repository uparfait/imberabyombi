/* sign/sign_list.jsx: the lists. All, Drafts, Waiting, Completed: the documents you prepared; To sign: the ones sent to
   you (waiting first, then the ones you signed). A row opens the document where it belongs: a draft to prepare it, a sent
   one to follow it, one sent to you to sign it. Empty lists say how they fill up. */
import { ic, i3 } from '../icons/index.js';
import { empty, initials } from '../ui/index.js';
import { auth } from '../auth/index.js';
import { to } from '../router/index.js';
import { LISTS, STATUS, of_list, my_turn, my_rec, signed_n, ago } from './sign_store.js';

export const status_chip = d => <span className={`chip ${STATUS[d.status][1]}`}>{STATUS[d.status][0]}</span>;
export const new_btn = (c = '') => auth.can('sign', 2)
  ? <a href={to('/admin/sign/new')} className={`btn btn_primary btn_sm ${c}`}>{ic('upload', 'h-4 w-4')}New document</a> : null;
const doc_href = d => to(d.status === 'draft' ? `/admin/sign/edit/${d.id}` : `/admin/sign/doc/${d.id}`);
const TONE = { draft: 'ink', sent: 'warn', completed: 'ok' };

const faces = d => <span className="sign_faces" aria-hidden="true">{d.recipients.slice(0, 4).map(r =>
  <span key={r.id} style={{ background: r.color }} title={r.name}>{initials(r.name)}</span>)}</span>;
const sub_of = d => { const n = d.recipients.length, s = signed_n(d);
  return d.status === 'draft' ? `Edited ${ago(d.updated)} · ${n ? `${n} signer${n > 1 ? 's' : ''}` : 'no signers yet'}`
    : d.status === 'sent' ? `${s} of ${n} signed · sent ${ago(d.sent_at)}` : `Completed ${ago(d.completed_at)}`; };

const row = (d, href, right, sub) => <li key={d.id}><a href={href} className="sign_row card card_hover">
  {i3('file', 'h-11 w-11', TONE[d.status])}
  <span className="min-w-0 flex-1"><span className="block truncate font-medium">{d.title}</span>
    <span className="block truncate text-sm text-muted">{sub || sub_of(d)}</span></span>
  {d.recipients.length ? faces(d) : null}{right || status_chip(d)}</a></li>;

function inbox() {
  const all = of_list('inbox'), wait = all.filter(my_turn), done = all.filter(d => !my_turn(d)), sign = d => to(`/admin/sign/sign/${d.id}`);
  if (!all.length) return <div className="card">{empty('Nothing to sign', 'Documents sent to your email address show up here, ready to sign.')}</div>;
  return <>
    {wait.length ? <ul className="grid gap-2">{wait.map(d => row(d, sign(d), <span className="btn btn_primary btn_sm">{ic('signature', 'h-4 w-4')}Sign</span>,
      `From ${d.owner_name} · sent ${ago(d.sent_at)}`))}</ul>
      : <div className="card">{empty('You are all caught up', 'Nothing is waiting for your signature.')}</div>}
    {done.length ? <><h2 className="sign_cap mt-8">Signed by you</h2><ul className="grid gap-2">{done.map(d => row(d, sign(d),
      <span className="chip bg-ok/15 text-ok">{ic('check', 'h-3.5 w-3.5')}{my_rec(d).status === 'signed' ? 'Signed' : 'Closed'}</span>, `From ${d.owner_name}`))}</ul></> : null}
  </>;
}

export function sign_list(k) {
  const [, l, , help] = LISTS.find(x => x[0] === k), rows = of_list(k);
  const body = k === 'inbox' ? inbox() : rows.length ? <ul className="grid gap-2">{rows.map(d => row(d, doc_href(d)))}</ul>
    : <div className="card">{k === 'all' ? empty('No documents yet', 'Upload a PDF, add the people who sign it and place their fields.', new_btn())
      : empty(`No ${l.toLowerCase()} documents`, help)}</div>;
  return <div className="sign_main page_enter">
    <section className="sign_head"><div className="min-w-0"><p className="text-sm text-muted">O-Doc Sign</p>
      <h1 className="mt-1 text-3xl sm:text-4xl">{l}</h1><p className="mt-2 text-muted">{help}</p></div>{new_btn('shrink-0')}</section>
