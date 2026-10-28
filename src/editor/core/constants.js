/* editor/core/constants.js: the editor's fixed tables (source "constants"): screen DPI, paper sizes, document fonts
   (template fonts + web-safe ones, no font service), zoom steps, paragraph styles, the colour palette, the CDN libraries
   loaded on demand for some import/export formats, and the block-tag tests used by the pagination engine. */

export const DPI = 96;
export const PAPER = {
  letter: { label: 'Letter (8.5" × 11")', w: 8.5, h: 11 }, legal: { label: 'Legal (8.5" × 14")', w: 8.5, h: 14 },
