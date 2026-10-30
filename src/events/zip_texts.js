/* events/zip_texts.js: the text of the parts of a zip file whose names match (an .xlsx or .ods spreadsheet is a zip of XML
   parts: its cells' text is in them). Reads the zip's directory and inflates each part with the browser's own
   DecompressionStream, so no library is needed. */
const inflate = async bytes => new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());

export async function zip_texts(buf, keep = name => /\.xml$/i.test(name)) {
  const u8 = new Uint8Array(buf), dv = new DataView(buf), dec = new TextDecoder(); let e = u8.length - 22;
  while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;   /* the end of the zip's directory */
  if (e < 0) throw new Error('This is not a zip file.');
  const out = []; let p = dv.getUint32(e + 16, true);
  for (let i = 0, n = dv.getUint16(e + 10, true); i < n; i++) {
    const method = dv.getUint16(p + 10, true), size = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), at = dv.getUint32(p + 42, true);
