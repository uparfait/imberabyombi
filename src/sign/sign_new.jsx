/* sign/sign_new.jsx: New document (/admin/sign/new): drop or choose a PDF (PDF only, up to 20 MB). The file is checked (it
   must start as a PDF and open as one), kept in this browser with its page sizes, and opens to add signers and fields. */
import { useState } from 'react';
import { i3 } from '../icons/index.js';
import { spinner, notify } from '../feedback/index.js';
import { help_tip } from '../ui/index.js';
import { go } from '../router/index.js';
import { new_doc, drop_doc } from './sign_store.js';
