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
  + `<Override PartName="/word/document.xml" ContentType="${WP}.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="${WP}.styles+xml"/>`
  + `<Override PartName="/word/numbering.xml" ContentType="${WP}.numbering+xml"/>`
  + `${has_header ? `<Override PartName="/word/header1.xml" ContentType="${WP}.header+xml"/>` : ''}`
  + `${has_footer ? `<Override PartName="/word/footer1.xml" ContentType="${WP}.footer+xml"/>` : ''}`
  + '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>';

export const DOCX_RELS = `${XML}<Relationships xmlns="${PR}"><Relationship Id="rId1" Type="${RELNS}/officeDocument" Target="word/document.xml"/>`
  + `<Relationship Id="rId2" Type="${PR}/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`;

export const docx_core = (title, now) => `${XML}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" `
  + 'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
  + `<dc:title>${xesc(title)}</dc:title><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>`
  + `<dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified></cp:coreProperties>`;

export const docx_numbering = (abs_xml, num_xml) =>
