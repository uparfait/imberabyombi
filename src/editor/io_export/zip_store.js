/* editor/io_export/zip_store.js: a ZIP writer with no compression ("stored" entries, UTF-8 names) and its CRC-32 table:
   the container of .docx, .xlsx and .epub files. files: [{ name, data: string | Uint8Array }]. */

/* ---------- DOCX writer (Office Open XML, no external library) ---------- */
export const CRC_T = (() => {
