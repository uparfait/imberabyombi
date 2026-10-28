/* editor/format/table_model.js: table building blocks: the style presets, building a table, applying a preset and the
   automatic header / stripe backgrounds, and row / column surgery that respects merged cells (colspan slots).
   A "chain" is a table split across pages: its parts are separate <table>s (the later ones carry data-cont). */
import { el } from '../core/index.js';

/* ================= tables ================= */
/* document colours (the page is paper: these are not theme colours) */
export const HDR_BG = '#e8eaed', STRIPE_BG = '#f8f9fa';
export const TABLE_PRESETS = [
  { key: 'grid', label: 'Grid', bw: 1, bc: '#000000', header: false, striped: false, style: '' },
