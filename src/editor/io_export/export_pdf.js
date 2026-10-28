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
  const { win, hin } = dims(), land = win > hin, bg = state.setup.page_color || '#ffffff';
  const pdf = new window.jspdf.jsPDF({ unit: 'in', format: [win, hin], orientation: land ? 'landscape' : 'portrait', compress: true });
  const holder = el('div', { style: 'position:absolute;left:-30000px;top:0' }); document.body.appendChild(holder);
  const orig = state.active, ids = scope === 'all' && state.tabs.length > 1 ? state.tabs.map(t => t.id) : [orig];
  if (ids.length > 1) { if (hist_timer) commit(); save_tab(); }
  let first = true;
  try {
    for (let ti = 0; ti < ids.length; ti++) {
      if (state.active !== ids[ti]) { state.active = ids[ti]; render_tab(); await new Promise(r => setTimeout(r, 80)); }
      const pages = qsa('.page', pages_el);
      for (let i = 0; i < pages.length; i++) {
        toast(`Making PDF: ${ids.length > 1 ? `tab ${ti + 1} of ${ids.length}, ` : ''}page ${i + 1} of ${pages.length}`, 0);
        const c = pages[i].cloneNode(true); c.style.transform = 'none'; c.style.boxShadow = 'none'; c.style.border = '0';
        qsa('.cmt', c).forEach(x => { x.style.background = 'none'; x.style.borderBottom = '0'; }); qsa('.img_sel', c).forEach(x => x.remove());
        qsa('[contenteditable]', c).forEach(x => x.removeAttribute('contenteditable'));
        holder.innerHTML = ''; holder.appendChild(c);
        /* html2canvas's own option names */
