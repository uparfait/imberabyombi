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
  const text = (s, o = {}) => { const size = o.size || 10, f = o.bold ? bold : font, max = A4[0] - M * 2 - (o.x || 0);
    let line = '';   /* wrap on spaces to the page width */
    const out = l => { room(size + 6); page.drawText(l, { x: M + (o.x || 0), y: y - size, size, font: f, color: o.color || ink }); y -= size + 5; };
    for (const w of plain(s).split(' ')) { const t = line ? `${line} ${w}` : w; if (f.widthOfTextAtSize(t, size) > max && line) { out(line); line = w; } else line = t; }
    out(line); };
  const rule = () => { room(16); page.drawLine({ start: { x: M, y: y - 6 }, end: { x: A4[0] - M, y: y - 6 }, thickness: .6, color: L.rgb(.86, .86, .88) }); y -= 18; };

  text('O-Doc Sign', { size: 10, bold: true, color: brand }); y -= 4;
  text('Signing certificate', { size: 22, bold: true }); y -= 6;
  text(`"${d.title}" was signed electronically by everyone it was sent to.`, { color: soft }); rule();
  [['Document', d.title], ['File', `${d.file} (${d.pages.length} page${d.pages.length === 1 ? '' : 's'})`], ['Document ID', d.id],
    ['Sent by', `${d.owner_name} <${d.owner}>`], ['Sent', when(d.sent_at)], ['Completed', when(d.completed_at)]]
    .forEach(([k, v]) => { text(k, { size: 8, bold: true, color: soft }); text(v, { size: 11 }); y -= 3; });
