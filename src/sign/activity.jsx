/* sign/activity.jsx: a document's activity, newest first, at a glance: the person's initials in their colour with the
   action's icon on them, their first name and one verb (uploaded, sent, opened, verified, signed, archived), and how long ago; the full
   sentence and date show on hover. Sending shows who it went to as faces, not a list of emails. */
import { ic } from '../icons/index.js';
import { initials } from '../ui/index.js';
import { seed_color } from '../lib/index.js';
import { when, ago } from './sign_store.js';

const ACTS = { upload: ['upload', 'uploaded it'], send: ['send', 'sent it to'], open: ['eye', 'opened it'], cert: ['shield', 'verified a certificate'],
  sign: ['signature', 'signed'], archive: ['archive', 'archived it'], restore: ['restart_alt', 'restored it'] };
/* entries saved before they carried their action read it from their sentence */
const RE = [['sign', / signed$/], ['open', / opened the document$/], ['cert', / verified their digital certificate/], ['send', / sent it to /], ['upload', / uploaded /], ['done', /^Everyone signed/]];
const act_of = a => a.act || RE.find(([, re]) => re.test(a.t))?.[0] || '';
/* who did it: a signer (by email, or by the name the sentence starts with), else the sender */
const person = (d, a) => { const r = d.recipients.find(x => a.by ? x.email === a.by : a.t.startsWith(x.name + ' '));
  return r ? { name: r.name, color: r.color } : { name: d.owner_name, color: seed_color(d.owner) }; };
const faces = d => <span className="sign_ev_faces">{d.recipients.slice(0, 5).map(r =>
  <span key={r.id} style={{ background: r.color }} title={r.name}>{initials(r.name)}</span>)}</span>;

function row(d, a, i) {
  const k = act_of(a), p = k === 'done' ? null : person(d, a), [icon, verb] = ACTS[k] || [];
  return <li key={i} className="sign_ev" title={`${a.t} · ${when(a.at)}`}>
    {p ? <span className="sign_ev_who" style={{ background: p.color }}>{initials(p.name)}{icon ? <i>{ic(icon, 'h-2.5 w-2.5')}</i> : null}</span>
      : <span className="sign_ev_who done">{ic('check', 'h-4 w-4')}</span>}
    <span className="sign_ev_text">{p ? verb ? <><b>{p.name.split(' ')[0]}</b>{verb}</> : a.t : <b>Completed</b>}{k === 'send' ? faces(d) : null}</span>
