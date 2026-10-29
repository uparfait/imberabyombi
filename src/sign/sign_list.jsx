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
