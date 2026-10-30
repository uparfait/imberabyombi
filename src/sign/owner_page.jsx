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
import { chips, note_text } from './signer_bits.jsx';

function Doc_view({ d }) {
  const marks = use_marks(d.id, d.updated);
  return <Pdf_pages doc={d} layer={i => fields_on(d, i, { mode: 'view', marks })} />;
}

const state = r => r.status === 'signed' ? `Signed ${when(r.signed_at)}` : r.viewed_at ? `Opened ${ago(r.viewed_at)}, not signed yet` : 'Waiting';
export const signer_rows = (d, links) => <ul className="grid gap-3">{d.recipients.map(r => <li key={r.id} className="flex items-start gap-3">
  <span className="sign_dot" style={{ background: r.color }}>{initials(r.name)}</span>
  <div className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{r.name}</span>
    <span className="block truncate text-xs text-muted">{r.email}</span>
    <span className={`block text-xs ${r.status === 'signed' ? 'text-ok' : 'text-warn'}`}>{state(r)}</span>
    {links ? <>{chips(r)}{note_text(r)}</> : null}</div>
  {r.status === 'signed' ? <span className="mt-1 text-ok">{ic('check', 'h-5 w-5')}</span>
    : links && d.status === 'sent' ? <button type="button" className="icon_btn h-8 w-8" data-act="sign_link" data-id={d.id} data-tip="Copy signing link"
      aria-label={`Copy the signing link for ${r.name}`}>{ic('link', 'h-4 w-4')}</button> : null}</li>)}</ul>;

export const progress = d => { const n = d.recipients.length, s = signed_n(d);
