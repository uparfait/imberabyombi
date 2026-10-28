/* editor/io_export/epub_parts.js: the EPUB 3 package files: the chapter page, container.xml, the package (content.opf)
   with its manifest and spine, and the table of contents (nav.xhtml). */
import { xesc } from './docx_runs.js';

const XHTML_HEAD = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n'
