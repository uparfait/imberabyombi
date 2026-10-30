/* events/invite_emails.js: the email addresses in text people type or paste, and in a file: a spreadsheet (.xlsx, .xlsm and
   .ods are read here; .xls with SheetJS, loaded from the CDN on first use), CSV or plain text. Every address in any cell
   or line is found, written in lower case, once each. */
import { zip_texts } from './zip_texts.js';

const EMAIL = /[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}/gi;
/* the parts that hold cells (not the file's own details, such as its author's address) */
const CELLS = n => /^(xl\/sharedStrings|xl\/worksheets\/sheet\d+|content)\.xml$/i.test(n);
export const find_emails = text => [...new Set((String(text).match(EMAIL) || []).map(m => m.toLowerCase()))];
/* what is left once the addresses are taken out (words that are not addresses: shown so they can be corrected) */
export const not_emails = text => String(text).replace(EMAIL, ' ').split(/[\s,;]+/).filter(Boolean);
export const INVITE_FILES = '.xlsx,.xlsm,.xls,.ods,.csv,.tsv,.txt';

export async function emails_in_file(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (['xlsx', 'xlsm', 'ods'].includes(ext)) return find_emails((await zip_texts(await file.arrayBuffer(), CELLS)).join(' '));
  if (ext === 'xls') {
    const [{ load_script }, { LIB }] = await Promise.all([import('../editor/core/utils.js'), import('../editor/core/constants.js')]);
    await load_script(LIB.xlsx); const wb = window.XLSX.read(new Uint8Array(await file.arrayBuffer()), { type: 'array' });
    return find_emails(wb.SheetNames.map(n => window.XLSX.utils.sheet_to_csv(wb.Sheets[n])).join('\n'));
  }
  return find_emails(await file.text());
}
