/* icon3d/glyph.js: what a 3D icon shows, made ready for the styles. An SVG (its colours become currentColor, scripts and
   event attributes are dropped), Iconify icon data ({ body, width, height, left, top }), or up to three characters of text.
   glyph(input, [font, weight]) → { inner (markup in currentColor), vb (viewBox numbers), sw (stroke width; 0 for fills) } */
export const esc_xml = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
export const clean_svg = s => String(s).replace(/<script[\s\S]*?<\/script>/gi, '').replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '').replace(/javascript:/gi, '');
const PAINT = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule'];

export const iconify_svg = i => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${i.left || 0} ${i.top || 0} ${i.width || 16} ${i.height || 16}">${i.body}</svg>`;

function from_svg(str) {
  const el = new DOMParser().parseFromString(clean_svg(str), 'text/html').querySelector('svg'); if (!el) return null;
