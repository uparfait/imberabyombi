/* editor/io_export/zip_store.js: a ZIP writer with no compression ("stored" entries, UTF-8 names) and its CRC-32 table:
   the container of .docx, .xlsx and .epub files. files: [{ name, data: string | Uint8Array }]. */

/* ---------- DOCX writer (Office Open XML, no external library) ---------- */
export const CRC_T = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
export function crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC_T[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
