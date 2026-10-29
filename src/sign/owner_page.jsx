/* sign/owner_page.jsx: a sent or completed document, for the person who sent it (/admin/sign/doc/<id>): the pages with
   every mark placed so far and, beside them (above them on phones), the progress: each signer with their note, when they
   opened or signed it and a link to copy, Sign now when it waits for you too, Download, Delete, and the activity. */
import { ic } from '../icons/index.js';
import { initials } from '../ui/index.js';
import { to } from '../router/index.js';
import { signed_n, my_turn, when, ago } from './sign_store.js';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { use_marks } from './use_marks.js';
import { status_chip } from './sign_list.jsx';

function Doc_view({ d }) {
  const marks = use_marks(d.id, d.updated);
  return <Pdf_pages doc={d} layer={i => fields_on(d, i, { mode: 'view', marks })} />;
}

const state = r => r.status === 'signed' ? `Signed ${when(r.signed_at)}` : r.viewed_at ? `Opened ${ago(r.viewed_at)}, not signed yet` : 'Waiting';
