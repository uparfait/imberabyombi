/* icon3d/color.js: colour helpers for the 3D icon engine: hex ↔ rgb ↔ hsl, shade() (lighter or darker, more or less
   saturated, hue turned), mix() of two colours, blend() along a list, and palette([primary, secondary, tertiary]), which
   works out the missing ones from the first. */
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const rgb = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(k => parseInt(h.substr(k, 2), 16)); };
export const to_hex = a => '#' + a.map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');

function to_hsl(hex) {
  const [r, g, b] = rgb(hex).map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0, s = 0; const l = (mx + mn) / 2;
  if (d) { s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
