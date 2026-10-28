/* editor/io_import/file_helpers.js: file helpers: image and code extensions, file names and sizes, the file-type
   badges (BADGES are data: one colour per file type) and the base64 / data URL conversions. */
import { esc_html } from '../core/index.js';

/* ---------- file helpers ---------- */
export const IMG_EXT = new Set('png jpg jpeg gif webp bmp svg avif ico'.split(' '));
export const CODE_EXT = new Set(('js mjs cjs ts jsx tsx py java c h cpp cc hpp cs go rb php rs kt kts swift sh bash zsh ps1 bat cmd sql css scss ' +
  'sass less xml yaml yml toml ini cfg conf env log r pl lua dart scala vue svelte gradle properties tex bib srt vtt diff patch').split(' '));
export const ext_of = n => { const m = /\.([^.]+)$/.exec(n || ''); return m ? m[1].toLowerCase() : ''; };
export const base_of = n => (n || 'Untitled').replace(/\.[^.]+$/, '');
export const fmt_size = n => n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB' : (n / 1048576).toFixed(1) + ' MB';
export const BADGES = {
  docx: ['DOCX', '#2b579a'], docm: ['DOCX', '#2b579a'], dotx: ['DOTX', '#2b579a'], doc: ['DOC', '#2b579a'], odt: ['ODT', '#2b579a'],
  rtf: ['RTF', '#8430ce'], pdf: ['PDF', '#d93025'], xlsx: ['XLSX', '#107c41'], xlsm: ['XLSM', '#107c41'], xls: ['XLS', '#107c41'],
  ods: ['ODS', '#107c41'], csv: ['CSV', '#12a4af'], tsv: ['TSV', '#12a4af'], json: ['JSON', '#5f6368'], pptx: ['PPTX', '#c43e1c'],
  odp: ['ODP', '#c43e1c'], ppt: ['PPT', '#c43e1c'], epub: ['EPUB', '#188038'], md: ['MD', '#3c4043'], markdown: ['MD', '#3c4043'],
  txt: ['TXT', '#80868b'], html: ['HTML', '#e8710a'], htm: ['HTML', '#e8710a']
};
export function file_badge(ext) {
  if (BADGES[ext]) return BADGES[ext];
  if (IMG_EXT.has(ext)) return [ext.toUpperCase().slice(0, 4), '#9334e6'];
  if (CODE_EXT.has(ext)) return [ext.toUpperCase().slice(0, 4), '#1a73e8'];
  return [(ext || 'FILE').toUpperCase().slice(0, 4), '#5f6368'];
}
/* the badge as an HTML string (the upload dialog draws the JSX twin, badge() in badge.jsx) */
export const badge_html = (ext, cls = 'fmt_badge') => { const [l, c] = file_badge(ext); return `<span class="${cls}" style="background:${c}">${esc_html(l)}</span>`; };
export function bytes_to_b64(u8) { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }
export function b64bytes(b) { const s = atob(b), a = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) a[i] = s.charCodeAt(i); return a; }
export function data_ur_lto_blob(u) {
  const k = u.indexOf(','), h = u.slice(0, k), b = u.slice(k + 1);
  const mime = (h.match(/^data:([^;,]+)/) || [])[1] || 'application/octet-stream';
  return new Blob([/;base64/i.test(h) ? b64bytes(b) : new TextEncoder().encode(decodeURIComponent(b))], { type: mime });
