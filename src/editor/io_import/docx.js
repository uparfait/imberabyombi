/* editor/io_import/docx.js: Word → HTML. mammoth (loaded on first use from the CDN) first; if it cannot be loaded or
   gives nothing, the built-in reader (docx_native): headings, title / subtitle, quotes, alignment, nested bullet /
   numbered lists, tables (spans, cell colours), content controls, page breaks, images, links. */
import { load_script, LIB } from '../core/index.js';
import { unzip } from './unzip.js';
import { parse_xml, by_tag, kids, rels_of } from './xml_helpers.js';
import { docx_val as val, docx_runs } from './docx_runs.js';
import { PB } from './pptx.js';

export async function docx_to_html(file) {
  const buf = await file.arrayBuffer();
  try {
    await load_script(LIB.mammoth);
