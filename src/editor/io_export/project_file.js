/* editor/io_export/project_file.js: the project file (.json with every tab, the page setup and the comments) and the
   helpers every export shares: the export file name, the content without comment marks, and the root an export reads. */
import { state, active_tab, file_base, download, toast, el, qsa, collect_html, hist_timer, commit } from '../core/index.js';
import { save_tab } from '../ui/index.js';
import { PB } from '../io_import/index.js';
import { flatten_abs_images } from '../content/index.js';
import { PROJECT_APP } from './content_css.js';

/* ================= export ================= */
export function save_project(name = file_base()) {
