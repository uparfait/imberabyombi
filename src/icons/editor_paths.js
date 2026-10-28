/* icons/editor_paths.js: every icon the document editor uses (toolbar, menus, panels, image bar, dialogs), keyed by the
   editor's icon names ('format_bold', 'undo', 'format_align_justify' …). paths.js spreads EDITOR_PATHS first into PATHS,
   so ic(), ic_html() and i3() find them; a template key with the same name (search, edit, link, image …) keeps its drawing. */
import { EDITOR_TEXT_PATHS } from './editor_paths_text.js';
import { EDITOR_DOC_PATHS } from './editor_paths_doc.js';
import { EDITOR_MEDIA_PATHS } from './editor_paths_media.js';
