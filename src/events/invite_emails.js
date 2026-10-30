/* events/invite_emails.js: the email addresses in text people type or paste, and in a file: a spreadsheet (.xlsx, .xlsm and
   .ods are read here; .xls with SheetJS, loaded from the CDN on first use), CSV or plain text. Every address in any cell
   or line is found, written in lower case, once each. */
import { zip_texts } from './zip_texts.js';

const EMAIL = /[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}/gi;
/* the parts that hold cells (not the file's own details, such as its author's address) */
