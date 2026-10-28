/* editor/io_import/unzip.js: a small zip reader (stored and deflate entries, the browser's DecompressionStream) for
   the office formats: names(), has(name), bytes(name), text(name), data_url(name) (images only). Names match case-insensitively. */
import { MIME, ext_of, bytes_to_b64 } from './file_helpers.js';

export async function unzip(buf) {
  const u8 = new Uint8Array(buf), dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  let e = -1; for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65557); i--) if (dv.getUint32(i, true) === 0x06054b50) { e = i; break; }
  if (e < 0) throw new Error('the file is damaged, or it is not really the format its name says');
  const count = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true);
  const dec = new TextDecoder(), entries = new Map();
