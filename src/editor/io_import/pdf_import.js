/* editor/io_import/pdf_import.js: PDF → HTML with pdf.js (loaded on first use from the CDN): the text of each page,
   lines joined into paragraphs, larger lines as headings, a page break between pages. */
import { load_script, LIB, PDFJS_WORKER, toast, esc_html } from '../core/index.js';
import { PB } from './pptx.js';

/* the text lines of one page: { text, y, h } (h = the tallest text on the line) */
function page_lines(tc) {
  const lines = []; let cur = { text: '', y: null, h: 0 };
  for (const it of tc.items) {
    if (!('str' in it)) continue;
    const y = it.transform[5], h = Math.abs(it.transform[3]) || it.height || 10;
    if (cur.y !== null && Math.abs(y - cur.y) > h * 0.5 && cur.text) { lines.push(cur); cur = { text: '', y: null, h: 0 }; }
    if (cur.y === null) cur.y = y; cur.text += it.str; cur.h = Math.max(cur.h, h);
    if (it.hasEOL) { lines.push(cur); cur = { text: '', y: null, h: 0 }; }
  }
  if (cur.text) lines.push(cur);
  return lines;
}
export async function pdf_to_html(buf) {
  await load_script(LIB.pdfjs); const lib = window.pdfjsLib; lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  const pdf = await lib.getDocument({ data: buf }).promise; let html = '';
  for (let p = 1; p <= pdf.numPages; p++) {
    toast(`Reading PDF page ${p} of ${pdf.numPages}…`, 0);
    const page = await pdf.getPage(p), tc = await page.getTextContent();
    const lines = page_lines(tc);
    const hs = lines.filter(l => l.text.trim()).map(l => l.h).sort((a, b) => a - b); const med = hs[Math.floor(hs.length / 2)] || 10;
    let para = null, prev_y = null, prev_h = 0;
    const flush = () => { if (para) { html += `<${para.tag}>${esc_html(para.text.trim())}</${para.tag}>`; para = null; } };
    for (const l of lines) {
      if (!l.text.trim()) { flush(); prev_y = l.y; continue; }
