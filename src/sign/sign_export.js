/* sign/sign_export.js: the PDF to download: the uploaded file with every signature and stamp placed so far drawn into its
   pages, and on a completed document a last page, the signing certificate (sign_cert.js). pdf-lib does the writing; it
   loads from the CDN the first time someone downloads. A mark keeps its shape inside its field and lands where it was
   placed on any page, rotated pages included. */
import { load_script } from '../editor/core/utils.js';
import { file_get } from './sign_idb.js';
import { certificate } from './sign_cert.js';

const PDF_LIB = ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js', 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js'];

/* field f (fractions of the page as shown) → where pdf-lib draws the image on the page as stored (origin bottom left) */
function place(page, f, img, degrees) {
  const box = page.getCropBox(), rot = ((page.getRotation().angle % 360) + 360) % 360, W = box.width, H = box.height;
  const [sw, sh] = rot % 180 ? [H, W] : [W, H], fw = f.w * sw, fh = f.h * sh;
  const k = Math.min(fw / img.width, fh / img.height), w = img.width * k, h = img.height * k;
  const x = f.x * sw + (fw - w) / 2, y = f.y * sh + (fh - h) / 2;   /* top-left corner, as shown */
  const at = { 0: [x, H - y - h], 90: [y + h, x], 180: [W - x, y + h], 270: [W - y - h, H - x] }[rot] || [x, H - y - h];
  page.drawImage(img, { x: box.x + at[0], y: box.y + at[1], width: w, height: h, rotate: degrees(rot) });
}

/* d: the record, marks: { field id: PNG data URL } → the new file's bytes */
export async function signed_pdf(d, marks) {
  await load_script(PDF_LIB); const L = window.PDFLib;
  const bytes = await file_get('pdf:' + d.id); if (!bytes) throw new Error('The PDF of this document is not in this browser.');
  const pdf = await L.PDFDocument.load(bytes, { ignoreEncryption: true }), pages = pdf.getPages(), imgs = new Map();
  for (const f of d.fields) {
    const url = marks[f.id], page = pages[f.page]; if (!url || !page) continue;
    if (!imgs.has(url)) imgs.set(url, await pdf.embedPng(url));
    place(page, f, imgs.get(url), L.degrees);
