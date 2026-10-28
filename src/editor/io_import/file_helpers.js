/* editor/io_import/file_helpers.js: file helpers: image and code extensions, file names and sizes, the file-type
   badges (BADGES are data: one colour per file type) and the base64 / data URL conversions. */
import { esc_html } from '../core/index.js';

/* ---------- file helpers ---------- */
export const IMG_EXT = new Set('png jpg jpeg gif webp bmp svg avif ico'.split(' '));
export const CODE_EXT = new Set(('js mjs cjs ts jsx tsx py java c h cpp cc hpp cs go rb php rs kt kts swift sh bash zsh ps1 bat cmd sql css scss ' +
