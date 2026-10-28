/* editor/io_import/project.js: project files (.json with every tab, the page setup and the comments): load one as the
   whole document, or turn its tabs into new tabs; and the "is the document still empty?" test (upload mode default). */
import { state, default_setup, new_tab, uid, bodies, el, qsa } from '../core/index.js';
import { sanitize_html } from '../content/index.js';
import { render_all } from '../ui/index.js';

/* project files written by the original editor name these setup keys in camelCase */
