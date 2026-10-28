/* overlays/modal.jsx: modal(), the one dialog for every form, confirm and detail view, and ask(), a confirm whose
   question is the title. The form itself is <Modal_form/> (modal_form.jsx), drawn into #modal by <Dialog_hosts/>. */
import { Children, Fragment } from 'react';
import { qs } from '../lib/index.js';
import { show_dialog } from '../feedback/index.js';
import { set_dialog } from './dialog_store.js';
import { pick } from './pick.js';
import { tip } from './tip.js';

/* actions: extra footer buttons (e.g. Edit / Delete on the details view); wide: at least 70% of a large screen (the task view).
   Reuses the dialog if it is already open.
