/* events/zip_texts.js: the text of the parts of a zip file whose names match (an .xlsx or .ods spreadsheet is a zip of XML
   parts: its cells' text is in them). Reads the zip's directory and inflates each part with the browser's own
   DecompressionStream, so no library is needed. */
const inflate = async bytes => new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());

export async function zip_texts(buf, keep = name => /\.xml$/i.test(name)) {
  const u8 = new Uint8Array(buf), dv = new DataView(buf), dec = new TextDecoder(); let e = u8.length - 22;
