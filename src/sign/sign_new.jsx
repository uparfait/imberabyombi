/* sign/sign_new.jsx: New document (/admin/sign/new): drop or choose a PDF (PDF only, up to 20 MB). The file is checked (it
   must start as a PDF and open as one), kept in this browser with its page sizes, and opens to add signers and fields. */
import { useState } from 'react';
import { i3 } from '../icons/index.js';
import { spinner, notify } from '../feedback/index.js';
import { go } from '../router/index.js';
import { new_doc, drop_doc } from './sign_store.js';
import { file_set } from './sign_idb.js';
import { read_pdf } from './pdf_lib.js';

const MAX = 20 * 1048576;
