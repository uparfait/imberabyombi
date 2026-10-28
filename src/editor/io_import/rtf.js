/* editor/io_import/rtf.js: RTF → HTML: paragraphs and line breaks, bold / italic / underline, page breaks, tables,
   Windows-1252 and Unicode characters, typographic quotes and dashes; header, footer, fonts, pictures… are skipped. */
import { esc_html } from '../core/index.js';
