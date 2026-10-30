/* qr/qr_brand.js: Qr-scan wears the site's look as set in Settings (brand colour, corner radius, spacing, font; kept in this
   browser with the site's other data, cfg.ns + 'tokens'), on the page and in what is installed. brand_apply() sets them at
   start and the light theme colour; when the brand colour is not the default, it also makes the manifest here (theme
   colour = the brand; icons: the site's mark drawn in the brand colour by the 3D engine), in place of the default one
   (public/qr-scan/manifest.webmanifest), and the tab and home-screen icons the same. brand() is that colour. */
import { cfg } from '../config/index.js';
import { render } from '../icon3d/index.js';
import { HASH, HASH_VIEW } from '../icons/index.js';

const DEF = '#E0661B', HEX = /^#[0-9a-f]{6}$/i;
const tokens = () => { try { return JSON.parse(localStorage.getItem(cfg.ns + 'tokens') || '{}') || {}; } catch { return {}; } };
export const brand = () => { const b = tokens().brand; return HEX.test(b || '') ? b : DEF; };

/* the site's mark in colour c: an SVG (n px), or a PNG data URL n px square with the mark taking k of it, on bg */
const mark = (c, n) => render(HASH, { style: 'glossy', colors: [c], size: n, px: n, view: HASH_VIEW });
const png = (c, n, k, bg) => new Promise((res, rej) => { const i = new Image();
  i.onload = () => { const cv = document.createElement('canvas'), s = n * k; cv.width = cv.height = n; const x = cv.getContext('2d');
    if (bg) { x.fillStyle = bg; x.fillRect(0, 0, n, n); } x.drawImage(i, (n - s) / 2, (n - s) / 2, s, s); res(cv.toDataURL('image/png')); };
  i.onerror = rej; i.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(mark(c, n)); });

async function install_files(c) {
  const at = new URL('./', location.href).href, link = (rel, href) => { const l = document.querySelector(`link[rel="${rel}"]`); if (l) l.href = href; };
  const icons = await Promise.all([[192, .86, null, 'any'], [512, .86, null, 'any'], [512, .58, '#FFFFFF', 'maskable']]
    .map(async ([n, k, bg, purpose]) => ({ src: await png(c, n, k, bg), sizes: `${n}x${n}`, type: 'image/png', purpose })));
  const m = { name: 'Qr-scan', short_name: 'Qr-scan', description: 'Scan a QR code. Secure links (https) open in a new tab.', id: at, start_url: at, scope: at,
    display: 'standalone', orientation: 'portrait', background_color: '#1F1F1F', theme_color: c, icons };
  link('manifest', URL.createObjectURL(new Blob([JSON.stringify(m)], { type: 'application/manifest+json' })));
  link('icon', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(mark(c, 64))); link('apple-touch-icon', await png(c, 180, .86, null));
}

export function brand_apply() {
  const t = tokens(), s = document.documentElement.style, c = brand();
  if (c !== DEF) { const v = [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); s.setProperty('--brand', v.join(' ')); s.setProperty('--brand_2', v.map(x => Math.round(x * .64)).join(' ')); }
  if (t.radius != null) s.setProperty('--radius', t.radius + 'rem');
  if (t.space != null) s.setProperty('--space', t.space + 'rem');
  if (t.font) s.setProperty('--font_sans', `"${t.font}", system-ui, sans-serif`);
