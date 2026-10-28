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
