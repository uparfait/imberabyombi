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
