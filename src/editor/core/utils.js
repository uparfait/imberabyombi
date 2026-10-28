/* editor/core/utils.js: small helpers (source "utils"): DOM lookup (qs / qsa, the source's $ / $$), ids, clamp, HTML
   escaping, the element builder, file download, the lazy script loader (cdnjs / jsdelivr), data URLs, colour → hex.
   Plain function declarations so other areas can call them even while modules are still loading (import cycles). */

export function qs(s, r = document) { return r.querySelector(s); }
export function qsa(s, r = document) { return Array.from(r.querySelectorAll(s)); }
export function uid() { return Math.random().toString(36).slice(2, 10); }
export function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
export function esc_html(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function el(tag, attrs = {}, html) {
  const e = document.createElement(tag);
  for (const k in attrs) { if (k === 'class') e.className = attrs[k]; else if (k === 'style') e.style.cssText = attrs[k]; else e.setAttribute(k, attrs[k]); }
  if (html != null) e.innerHTML = html;
  return e;
}
export function download(blob, name) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
}

/* one promise per library: the first URL that loads wins; a failed library can be retried later */
export const script_cache = {};
export function load_script(urls) {
  const key = urls[0];
  if (script_cache[key]) return script_cache[key];
  script_cache[key] = (async () => {
    let err;
    for (const u of urls) {
      try {
        await new Promise((res, rej) => {
          const s = document.createElement('script'); s.src = u; s.onload = res;
          s.onerror = () => { s.remove(); rej(new Error('load failed: ' + u)); }; document.head.appendChild(s);
        });
        return;
      } catch (e) { err = e; }
    }
    delete script_cache[key]; throw err;
  })();
  return script_cache[key];
}
export function read_as_data_url(f) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(f); });
}

/* CSS colour → 'RRGGBB' (null for transparent / unknown); the 2D context is made on first use, not at module load */
export let _cctx = null;
export function to_hex(c) {
  if (!c) return null; c = String(c).trim();
  if (!c || /^(transparent|inherit|initial|unset|currentcolor)$/i.test(c)) return null;
  if (!_cctx) _cctx = document.createElement('canvas').getContext('2d');
  _cctx.fillStyle = '#010203'; _cctx.fillStyle = c; const v = _cctx.fillStyle;
  if (v === '#010203' && c.toLowerCase() !== '#010203') return null;
  if (v[0] === '#') return v.slice(1).toUpperCase();
  const m = v.match(/rgba?\(([^)]+)\)/); if (!m) return null;
  const p = m[1].split(',').map(parseFloat); if (p.length > 3 && p[3] === 0) return null;
  return p.slice(0, 3).map(n => Math.round(n).toString(16).padStart(2, '0')).join('').toUpperCase();
}
