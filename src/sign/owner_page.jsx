/* sign/owner_page.jsx: a sent or completed document, for the person who sent it (/admin/sign/doc/<id>): the pages with
   every mark placed so far and, beside them (above them on phones), the progress: each signer with their note, when they
   opened or signed it and a link to copy, Sign now when it waits for you too, Download, Delete, and the activity. */
import { ic } from '../icons/index.js';
import { initials } from '../ui/index.js';
import { to } from '../router/index.js';
import { signed_n, my_turn, when, ago } from './sign_store.js';
import { Pdf_pages } from './pdf_pages.jsx';
