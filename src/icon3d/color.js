/* icon3d/color.js: colour helpers for the 3D icon engine: hex ↔ rgb ↔ hsl, shade() (lighter or darker, more or less
   saturated, hue turned), mix() of two colours, blend() along a list, and palette([primary, secondary, tertiary]), which
   works out the missing ones from the first. */
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const rgb = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(k => parseInt(h.substr(k, 2), 16)); };
