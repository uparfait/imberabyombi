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
