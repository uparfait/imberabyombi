/* editor/core/utils.js: small helpers (source "utils"): DOM lookup (qs / qsa, the source's $ / $$), ids, clamp, HTML
   escaping, the element builder, file download, the lazy script loader (cdnjs / jsdelivr), data URLs, colour → hex.
   Plain function declarations so other areas can call them even while modules are still loading (import cycles). */

export function qs(s, r = document) { return r.querySelector(s); }
export function qsa(s, r = document) { return Array.from(r.querySelectorAll(s)); }
