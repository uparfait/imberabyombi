/* editor/core/refs.js: DOM references, filled by editor_start(root) (never looked up at module load).
   refs.<id> = the element with that (snake_case) id inside the editor root: refs.pages, refs.scroller, refs.hruler,
   refs.vruler, refs.workspace, refs.toolbar, refs.doc_title, refs.find_panel, refs.size_input, refs.tab_list, …
   plus refs.root (the editor root) and refs.pages_el (= refs.pages). Any other key is looked up by id on first use
   (and again when React replaced the element). pages_el / scroller / hruler / vruler are also live exports. */

const ALIAS = { pages_el: 'pages' };
const store = Object.create(null);

export let pages_el = null, scroller = null, hruler = null, vruler = null;

const find = id => (store.root && store.root.isConnected && store.root.querySelector('#' + CSS.escape(id))) || document.getElementById(id);
export const refs = new Proxy(store, {
  get(o, k) {
    if (typeof k !== 'string') return o[k];
    const v = o[k];
    if (k === 'root' || (v && (!(v instanceof Node) || v.isConnected))) return v ?? null;
    if (!o.root) return v ?? null;
    const f = find(ALIAS[k] || k);
    if (f) o[k] = f;
    return f || v || null;
  },
  set(o, k, v) { o[k] = v; return true; }
});

/* fill from the root: every element with an id, the root itself and the aliases */
export function fill_refs(root) {
  clear_refs();
  store.root = root;
  if (root) for (const e of root.querySelectorAll('[id]')) if (!(e.id in store)) store[e.id] = e;
