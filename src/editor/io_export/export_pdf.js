/* editor/io_export/export_pdf.js: PDF: every page drawn as a picture (html2canvas) into a PDF of the paper size (jsPDF).
   Both tools load on first use from the CDN (load_script). scope 'all' draws every tab in turn, then reopens the first. */
import { state, dims, qsa, el, toast, load_script, LIB, pages_el, hist_timer, commit } from '../core/index.js';
import { save_tab, render_tab, render_sidebar } from '../ui/index.js';
import { hide_img_sel, render_comments } from '../content/index.js';

export async function export_pdf(scope, name, scale = 2) {
  hide_img_sel();
  try { await Promise.all([load_script(LIB.jspdf), load_script(LIB.h2c)]); }
  catch (e) { throw new Error('The PDF tools could not be downloaded. Check your internet connection, or use File, then Print, and choose “Save as PDF”.'); }
  if (document.fonts) await document.fonts.ready;
