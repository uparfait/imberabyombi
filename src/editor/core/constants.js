/* editor/core/constants.js: the editor's fixed tables (source "constants"): screen DPI, paper sizes, document fonts
   (template fonts + web-safe ones, no font service), zoom steps, paragraph styles, the colour palette, the CDN libraries
   loaded on demand for some import/export formats, and the block-tag tests used by the pagination engine. */

export const DPI = 96;
export const PAPER = {
  letter: { label: 'Letter (8.5" × 11")', w: 8.5, h: 11 }, legal: { label: 'Legal (8.5" × 14")', w: 8.5, h: 14 },
  tabloid: { label: 'Tabloid (11" × 17")', w: 11, h: 17 }, executive: { label: 'Executive (7.25" × 10.5")', w: 7.25, h: 10.5 },
  a3: { label: 'A3 (11.69" × 16.54")', w: 11.69, h: 16.54 }, a4: { label: 'A4 (8.27" × 11.69")', w: 8.27, h: 11.69 },
  a5: { label: 'A5 (5.83" × 8.27")', w: 5.83, h: 8.27 }, b5: { label: 'B5 (6.93" × 9.84")', w: 6.93, h: 9.84 }
};
/* the site's own fonts (already served with the template) + web-safe fonts; the document default stays Arial */
export const FONTS = ['Arial', 'Bricolage Grotesque', 'Comic Sans MS', 'Courier New', 'Figtree', 'Georgia', 'Impact', 'JetBrains Mono',
  'Times New Roman', 'Trebuchet MS', 'Verdana'];
export const ZOOMS = [50, 75, 90, 100, 125, 150, 200];
export const STYLES = [
  { key: 'p', label: 'Normal text', tag: 'P', css: 'font-size:14px' },
  { key: 'title', label: 'Title', tag: 'P', cls: 'title', css: 'font-size:24px' },
  { key: 'subtitle', label: 'Subtitle', tag: 'P', cls: 'subtitle', css: 'font-size:16px;color:#666' },
  { key: 'h1', label: 'Heading 1', tag: 'H1', css: 'font-size:20px' },
  { key: 'h2', label: 'Heading 2', tag: 'H2', css: 'font-size:17px' },
  { key: 'h3', label: 'Heading 3', tag: 'H3', css: 'font-size:15px;color:#434343' },
  { key: 'h4', label: 'Heading 4', tag: 'H4', css: 'font-size:14px;color:#666' }
];
export const PALETTE = [
  ['#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff'],
  ['#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff'],
  ['#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc'],
  ['#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd'],
  ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0'],
  ['#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79'],
  ['#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47'],
  ['#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130']
];
/* lazy-loaded libraries (load_script tries each URL in turn) */
export const LIB = {
  mammoth: ['https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js'],
  jspdf: ['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'],
  h2c: ['https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'],
  pdfjs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'],
  xlsx: ['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js']
