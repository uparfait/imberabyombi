/* editor/io_import/upload_dialog.jsx: "Upload files" (the template's modal): drop zone / browse, the chosen files,
   where the content goes (at the cursor, in new tabs, replace the document). Add converts them once the dialog has
   closed, with the cursor put back where it was when the dialog opened. */
import { modal } from '../../overlays/index.js';
import { state, qs, toast, last_range, last_host, set_last } from '../core/index.js';
import { after_close } from '../format/index.js';
import { is_doc_empty } from './project.js';
import { process_uploads } from './process_uploads.js';
