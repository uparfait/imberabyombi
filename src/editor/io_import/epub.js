/* editor/io_import/epub.js: EPUB → HTML: the book's chapters in reading order (at most 400), each chapter's body with
   its images inlined as data URLs (missing ones removed), chapters separated by page breaks. */
import { unzip } from './unzip.js';
import { parse_xml, by_tag, dir_of, resolve_path } from './xml_helpers.js';
import { PB } from './pptx.js';

export async function epub_to_html(file) {
  const z = await unzip(await file.arrayBuffer());
