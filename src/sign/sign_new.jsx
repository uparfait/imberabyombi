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
