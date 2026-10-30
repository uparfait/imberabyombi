/* sign/sign_done.jsx: "Signing complete" (/admin/sign/done/<id>), shown right after you sign: the document, when you
   signed, its status now, and the way back (the document, or your To sign list). */
import { i3 } from '../icons/index.js';
import { to } from '../router/index.js';
import { my_rec, when } from './sign_store.js';
import { status_chip } from './sign_list.jsx';

export function sign_done(d) {
  const r = my_rec(d), all = d.status === 'completed';
  return <div className="sign_main page_enter grid place-items-center">
    <section className="card w-full max-w-md p-9">
      <span className="sign_done_badge">{i3('check', 'h-20 w-20', 'ok')}</span>
      <h1 className="mt-4 text-3xl">Signing complete</h1>
      <p className="mt-1 text-muted">You signed “{d.title}”.</p>
      <dl className="sign_facts">
        <dt>Document</dt><dd className="truncate">{d.title}</dd>
        <dt>Signed</dt><dd>{when(r?.signed_at)}</dd>
        <dt>Status</dt><dd>{status_chip(d)}</dd></dl>
      <p className="mt-6 text-xs leading-relaxed text-muted">{all ? 'Everyone has signed. The signed PDF can be downloaded from the document.'
        : 'Others still need to sign. The document is complete once they have.'}</p>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <a href={to(`/admin/sign/sign/${d.id}`)} className="btn btn_outline btn_sm">View document</a>
        <a href={to('/admin/sign/inbox')} className="btn btn_primary btn_sm">Back to To sign</a></div>
    </section></div>;
}
