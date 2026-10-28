/* editor/io_export/formats.js: the download formats (badge colour, icon key for ic(), whether the format can hold one
   tab or all), the document's figures for the download summary, and do_export, which writes the chosen format. */
import { state, qsa, bodies, file_base, toast } from '../core/index.js';
import { save_project, export_root } from './project_file.js';
import { export_html, export_txt } from './export_text.js';
import { export_md } from './html_to_md.js';
import { export_pdf } from './export_pdf.js';
import { export_rtf } from './export_rtf.js';
import { export_epub } from './export_epub.js';
import { top_tables, export_csv } from './export_data.js';
import { export_xlsx } from './export_xlsx.js';
import { export_docx } from './export_docx.js';

export const FORMATS = [
  { key: 'docx', ext: 'docx', name: 'Word document', desc: 'Edit in Word, LibreOffice or any word processor', color: '#2b579a', icon: 'description', tabs: true },
