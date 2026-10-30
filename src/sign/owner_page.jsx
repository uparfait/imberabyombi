/* sign/owner_page.jsx: a sent or completed document, for the person who sent it (/admin/sign/doc/<id>): the pages with
   every mark placed so far and, beside them (above them on phones), the progress: each signer with their note, when they
   opened or signed it and a link to copy, Sign now when it waits for you too, Download, Delete (or, once someone has
   signed, Archive / Restore: a signed document is never deleted), and the activity. */
import { ic } from '../icons/index.js';
import { initials } from '../ui/index.js';
import { to } from '../router/index.js';
import { signed_n, my_turn, when, ago, kept_for_good } from './sign_store.js';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { use_marks } from './use_marks.js';
import { status_chip } from './sign_list.jsx';
import { activity } from './activity.jsx';
import { doc_opts } from './signer_bits.jsx';

function Doc_view({ d }) {
  const marks = use_marks(d.id, d.updated);
  return <Pdf_pages doc={d} layer={i => fields_on(d, i, { mode: 'view', marks })} />;
}

const state = r => r.status === 'signed' ? `Signed ${when(r.signed_at)}` : r.viewed_at ? `Opened ${ago(r.viewed_at)}, not signed yet` : 'Waiting';
export const signer_rows = (d, links) => <ul className="grid gap-3">{d.recipients.map(r => <li key={r.id} className="flex items-start gap-3" style={{ '--c': r.color }}>
  <span className="sign_dot" style={{ background: r.color }}>{initials(r.name)}</span>
  <div className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{r.name}</span>
    <span className="block truncate text-xs text-muted">{r.email}</span>
    <span className={`block text-xs ${r.status === 'signed' ? 'text-ok' : 'text-warn'}`}>{state(r)}</span>
    {links ? <>{chips(r)}{note_text(r)}</> : null}</div>
  {r.status === 'signed' ? <span className="mt-1 text-ok">{ic('check', 'h-5 w-5')}</span>
    : links && d.status === 'sent' ? <button type="button" className="icon_btn h-8 w-8" data-act="sign_link" data-id={d.id} data-tip="Copy signing link"
      aria-label={`Copy the signing link for ${r.name}`}>{ic('link', 'h-4 w-4')}</button> : null}</li>)}</ul>;

export const progress = d => { const n = d.recipients.length, s = signed_n(d);
  return <><div className="flex items-center gap-2">{status_chip(d)}{d.archived ? <span className="chip bg-fg/10 text-fg/70">Archived</span> : null}
    <span className="text-sm text-muted">{s} of {n} signed</span></div>
    <div className="sign_prog mt-3" role="progressbar" aria-valuemin={0} aria-valuemax={n} aria-valuenow={s}><i style={{ width: `${n ? s / n * 100 : 0}%` }}></i></div></>; };

export const dl_label = d => d.status === 'completed' ? 'Download signed PDF' : 'Download PDF';

export const owner_page = d => <div className="sign_split">
  <aside className="sign_side" aria-label="Progress">
    <section className="card p-5">{progress(d)}<div className="mt-5">{signer_rows(d, true)}</div>
      <div className="mt-5 grid gap-2">
        {my_turn(d) ? <a href={to(`/admin/sign/sign/${d.id}`)} className="btn btn_primary btn_sm">{ic('signature', 'h-4 w-4')}Sign now</a> : null}
        <button type="button" className="btn btn_outline btn_sm" data-act="sign_dl" data-id={d.id}>{ic('download', 'h-4 w-4')}{dl_label(d)}</button>
        {kept_for_good(d) ? <button type="button" className={`btn btn_sm ${d.archived ? 'btn_outline' : 'btn_warn'}`} data-act={d.archived ? 'sign_doc_restore' : 'sign_doc_archive'} data-id={d.id}>
          {ic(d.archived ? 'restart_alt' : 'archive', 'h-4 w-4')}{d.archived ? 'Restore from archive' : 'Archive'}</button>
          : <button type="button" className="btn btn_danger btn_sm" data-act="sign_doc_del" data-id={d.id}>{ic('trash', 'h-4 w-4')}Delete document</button>}</div></section>
    <details className="card p-5" open><summary className="sign_cap cursor-pointer">Activity</summary>
      {activity(d)}</details>
  </aside>
  <section className="sign_center" aria-label="Pages"><Doc_view d={d} /></section>
</div>;
