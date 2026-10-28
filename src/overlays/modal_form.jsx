/* overlays/modal_form.jsx: <Modal_form/>, the form modal() shows in #modal (drawn by <Dialog_hosts/>): header (title,
   help tip, x), body (message slot + grid) or, for a dialog without content, the help as its text in a compact layout
   without dividers, and the footer (Cancel + submit, or custom actions). */
import { useLayoutEffect, useRef } from 'react';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
import { form_obj } from '../fields/index.js';
import { validate, request } from '../feedback/index.js';
import { run_view } from './dialog_store.js';
import { close_dialog, snap } from './dialogs.js';

const blank = v => v == null || v === false || v === '' || (Array.isArray(v) && !v.length);
