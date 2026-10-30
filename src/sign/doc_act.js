/* sign/doc_act.js: the document page's buttons (data-act): copy the signing link (signers open it, sign in with their
   email and land on the document), download the PDF with the marks placed so far (a completed one with its certificate),
   delete the document with its PDF and marks (only while nobody has signed it), and archive or restore a signed one. */
import { notify } from '../feedback/index.js';
import { rerender } from '../store/index.js';
import { ask, copy } from '../overlays/index.js';
import { base_url } from '../auth/index.js';
import { go } from '../router/index.js';
import { find_doc, drop_doc, save_doc, log, who, kept_for_good } from './sign_store.js';
import { drop_files, marks_get } from './sign_idb.js';
import { forget_pdf } from './pdf_lib.js';
import { signed_pdf, save_pdf } from './sign_export.js';

export const DOC_ACT = {
  sign_link: t => copy(base_url(`/admin/sign/sign/${t.dataset.id}`), 'Signing link'),
  sign_dl: async t => {
    const d = find_doc(t.dataset.id); if (!d) return;
    try { save_pdf(`${d.title}${d.status === 'completed' ? ' (signed)' : ''}.pdf`, await signed_pdf(d, await marks_get(d.id))); }
    catch (e) { console.error(e); notify('The PDF could not be built. Check your connection and try again.', 'bad', 'Download failed'); }
  },
  sign_doc_del: t => { const d = find_doc(t.dataset.id);
    if (kept_for_good(d)) return notify('Someone has signed it, so it is kept. Archive it instead.', 'warn', 'A signed document cannot be deleted');
    ask(`Delete “${d.title}”? Its PDF and every signature on it are removed from this browser.`, async () => {
      drop_doc(d.id); forget_pdf(d.id); await drop_files(d.id);
      notify(`“${d.title}” is deleted.`, 'ok', 'Document deleted'); go('/admin/sign');
    }); },
  sign_doc_archive: t => { const d = find_doc(t.dataset.id);
    ask(`Archive “${d.title}”? It moves to Archived, out of your other lists. Its signers still see it, and you can restore it.`, () => {
      Object.assign(d, { archived: true, archived_at: Date.now() }); log(d, `${who().name} archived it`, 'archive', who().email); save_doc(d);
      notify(`“${d.title}” is under Archived.`, 'ok', 'Document archived'); go('/admin/sign/archived');
    }, 'Archive'); },
  sign_doc_restore: t => { const d = find_doc(t.dataset.id);
    d.archived = false; log(d, `${who().name} restored it from the archive`, 'restore', who().email); save_doc(d);
    notify(`“${d.title}” is back in your lists.`, 'ok', 'Document restored'); rerender(); }
};
