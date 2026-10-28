/* actions/theme.js: light / dark switch, the design tokens a manager can change in Settings (brand colour, radius,
   spacing, font) and the filled part of range inputs. */
import { qs, qsa, css_var, hex2rgb, rgb2hex } from '../lib/index.js';
import { db } from '../store/index.js';
import { redraw_charts } from '../charts/index.js';

/* Theme switches are instant: no cross-fade and no colour transitions for that frame (easier on the eyes) */
export function set_theme(mode) {
  db.set('theme', mode);
  const h = document.documentElement; h.classList.add('theme_switch');
  h.classList.toggle('dark', mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches));
  void h.offsetWidth; requestAnimationFrame(() => requestAnimationFrame(() => h.classList.remove('theme_switch')));
  redraw_charts(); hex_refresh();
}
/* Colour tokens shown as hex (design system swatches) follow the theme and brand changes.
   The [data-hex] buttons are rendered empty on purpose: this fills them. */
export const hex_refresh = () => qsa('[data-hex]').forEach(b => { const h = rgb2hex(css_var('--' + b.dataset.hex)).toUpperCase(); b.textContent = h; b.dataset.text = h; });
export function apply_tokens() {
  const t = db.get('tokens', {}), s = document.documentElement.style;
  ['--brand', '--brand_2', '--radius', '--space', '--font_sans'].forEach(p => s.removeProperty(p));
  if (t.brand) { const c = hex2rgb(t.brand); s.setProperty('--brand', c.join(' ')); s.setProperty('--brand_2', c.map(v => Math.round(v * .64)).join(' ')); }
  if (t.radius != null) s.setProperty('--radius', t.radius + 'rem');
  if (t.space != null) s.setProperty('--space', t.space + 'rem');
