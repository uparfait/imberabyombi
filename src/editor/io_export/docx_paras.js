/* editor/io_export/docx_paras.js: Word paragraphs: paragraph properties (style, spacing, indent, alignment), plain
   paragraphs, and lists (numbered and bulleted through numbering.xml, checklists as ☑ / ☐ marks). */
import { is_list } from '../core/index.js';
import { inline_xml, parse_pt } from './docx_runs.js';

export const JC = { left: 'left', start: 'left', center: 'center', right: 'right', end: 'right', justify: 'both' };
