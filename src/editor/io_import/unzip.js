/* editor/io_import/unzip.js: a small zip reader (stored and deflate entries, the browser's DecompressionStream) for
   the office formats: names(), has(name), bytes(name), text(name), data_url(name) (images only). Names match case-insensitively. */
import { MIME, ext_of, bytes_to_b64 } from './file_helpers.js';

export async function unzip(buf) {
  const u8 = new Uint8Array(buf), dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  let e = -1; for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65557); i--) if (dv.getUint32(i, true) === 0x06054b50) { e = i; break; }
  if (e < 0) throw new Error('the file is damaged, or it is not really the format its name says');
  const count = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true);
  const dec = new TextDecoder(), entries = new Map();
  for (let k = 0; k < count && p + 46 <= u8.length; k++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const nlen = dv.getUint16(p + 28, true);
    entries.set(dec.decode(u8.subarray(p + 46, p + 46 + nlen)), { method: dv.getUint16(p + 10, true), csize: dv.getUint32(p + 20, true), off: dv.getUint32(p + 42, true) });
    p += 46 + nlen + dv.getUint16(p + 30, true) + dv.getUint16(p + 32, true);
  }
  const cache = new Map();
  const find = n => entries.has(n) ? n : Array.from(entries.keys()).find(k => k.toLowerCase() === String(n).toLowerCase());
  async function bytes(n) {
    const name = find(n), en = name && entries.get(name); if (!en) throw new Error('a part of the file is missing: ' + n);
    if (cache.has(name)) return cache.get(name);
    const start = en.off + 30 + dv.getUint16(en.off + 26, true) + dv.getUint16(en.off + 28, true), raw = u8.subarray(start, start + en.csize); let out;
    if (en.method === 0) out = raw;
    else if (en.method === 8) {
      if (typeof DecompressionStream === 'undefined') throw new Error('this browser can’t unpack it. Try the latest Chrome, Edge, Firefox or Safari');
      out = new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());
    }
    else throw new Error('it uses a compression method that isn’t supported');
    cache.set(name, out); return out;
