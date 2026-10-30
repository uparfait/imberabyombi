/* sign/sign_cert.js: the signing certificate, the last page of a completed document's download (A4): the document (title,
   file, its id, who sent it and when), then each signer with their email, when they opened it and when they signed, and the
   activity. Text is written in Helvetica, so letters it cannot show become "?". */
import { when } from './sign_store.js';

const A4 = [595.28, 841.89], M = 56;
const plain = s => String(s ?? '').replace(/[  ]/g, ' ').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-')
  .replace(/[^\x20-\x7E\xA0-\xFF]/g, '?');

export async function certificate(pdf, d, L) {
  const font = await pdf.embedFont(L.StandardFonts.Helvetica), bold = await pdf.embedFont(L.StandardFonts.HelveticaBold);
  const ink = L.rgb(.13, .13, .16), soft = L.rgb(.42, .42, .47), brand = L.rgb(.878, .4, .106);
  let page = pdf.addPage(A4), y = A4[1] - M;
  const room = need => { if (y - need < M) { page = pdf.addPage(A4); y = A4[1] - M; } };
