/* editor/io_import/sheets.js: spreadsheets → one heading + table per sheet. SheetJS (loaded on first use from the CDN)
   reads every format; if it cannot be loaded, .xlsx / .xlsm are read by the built-in reader (xlsx_native). */
import { load_script, LIB, esc_html } from '../core/index.js';
