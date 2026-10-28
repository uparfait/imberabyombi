/* editor/io_import/json_attach.js: JSON → a table (a list of records, a list of rows, or key / value pairs) or a code
   block; a project file is recognised and returned as { project }. And any file as a downloadable attachment chip. */
import { esc_html, read_as_data_url } from '../core/index.js';
import { PROJECT_APP } from '../io_export/index.js';
