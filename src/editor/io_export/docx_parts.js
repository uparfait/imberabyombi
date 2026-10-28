/* editor/io_export/docx_parts.js: the Word package's other files: [Content_Types].xml, the package and document
   relationships, the core properties (title, dates), numbering.xml, the page header and the footer (text + page number). */
import { el } from '../core/index.js';
import { xesc, RELNS, WNS, inline_xml } from './docx_runs.js';
import { blocks_xml } from './docx_table.js';
