/* editor/io_export/rtf_parts.js: the Rich Text writer's pieces: colour and font tables, escaping, run codes, pictures,
   inline runs and paragraphs. rx = { colors, fonts, content_tw } holds one export's tables (see export_rtf.js). */
import { is_list, is_table } from '../core/index.js';
import { b64bytes } from '../io_import/index.js';
