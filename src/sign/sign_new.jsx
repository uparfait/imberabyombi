/* sign/sign_new.jsx: New document (/admin/sign/new): drop or choose a PDF (PDF only, up to 20 MB). The file is checked (it
   must start as a PDF and open as one), kept in this browser with its page sizes, and opens to add signers and fields. */
import { useState } from 'react';
import { i3 } from '../icons/index.js';
import { spinner, notify } from '../feedback/index.js';
import { help_tip } from '../ui/index.js';
import { go } from '../router/index.js';
import { new_doc, drop_doc } from './sign_store.js';
import { file_set } from './sign_idb.js';
import { read_pdf } from './pdf_lib.js';

const MAX = 20 * 1048576;
const STEPS = [['Upload', 'A PDF of the document to sign.'], ['Add signers', 'Who signs it, with a note for each one.'],
  ['Place and send', 'Their signature and stamp fields, then send.']];
const bad = (text, title) => { notify(text, 'bad', title); return false; };

async function take(file) {
  if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') return bad('Only PDF files can be uploaded. Save the document as a PDF first.', 'Not a PDF');
  if (file.size > MAX) return bad('Choose a PDF of 20 MB or less.', 'The file is too large');
  const bytes = await file.arrayBuffer();
  if (!new TextDecoder().decode(bytes.slice(0, 1024)).includes('%PDF')) return bad('This file is not a PDF, whatever its name says.', 'Not a PDF');
  let pages; try { pages = await read_pdf(bytes); } catch { return bad('It may be damaged, or locked with a password.', 'This PDF could not be read'); }
  if (!pages.length) return bad('This PDF has no pages.', 'Empty PDF');
  const d = new_doc(file.name, file.size, pages);
  if (!await file_set('pdf:' + d.id, bytes)) { drop_doc(d.id); return bad('Free some space in this browser, then try again.', 'The PDF could not be kept'); }
  go(`/admin/sign/edit/${d.id}`); return true;
}

export function Sign_new() {
  const [busy, set_busy] = useState(false), [over, set_over] = useState(false);
  const pick = async f => { if (busy || !f) return; set_busy(true); if (!await take(f).catch(() => false)) set_busy(false); };
  return <div className="sign_main page_enter max-w-3xl">
    <section className="sign_head"><div className="sign_page_title"><h1>New document</h1>
      {help_tip('Upload a PDF. You add the people who sign it and place their fields next.', 'New document')}</div></section>
    <label className={`sign_drop ${over ? 'over' : ''}`} aria-busy={busy || undefined}
      onDragOver={e => { e.preventDefault(); set_over(true); }} onDragLeave={() => set_over(false)}
      onDrop={e => { e.preventDefault(); set_over(false); pick(e.dataTransfer.files[0]); }}>
      <input type="file" accept="application/pdf,.pdf" className="sr-only" disabled={busy} onChange={e => { pick(e.target.files[0]); e.target.value = ''; }} />
      {busy ? spinner('h-14 w-14') : i3('upload', 'h-16 w-16', 'info')}
