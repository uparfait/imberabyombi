/* editor/io_export/docx_parts.js: the Word package's other files: [Content_Types].xml, the package and document
   relationships, the core properties (title, dates), numbering.xml, the page header and the footer (text + page number). */
import { el } from '../core/index.js';
import { xesc, RELNS, WNS, inline_xml } from './docx_runs.js';
import { blocks_xml } from './docx_table.js';

const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const PR = 'http://schemas.openxmlformats.org/package/2006/relationships';
const WP = 'application/vnd.openxmlformats-officedocument.wordprocessingml';

export const docx_types = (has_header, has_footer) => `${XML}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">`
  + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'
  + '<Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="gif" ContentType="image/gif"/>'
