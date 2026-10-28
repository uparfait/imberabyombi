/* store/db.js: STORE. ls = localStorage with an in-memory fallback (private mode, sandboxes); db = JSON values under the
   cfg.ns prefix, plus collections ('c:<name>': arrays of records) that seed themselves on first read. */
import { cfg } from '../config/index.js';
import { uid } from '../lib/index.js';

export const ls = (() => { try { localStorage.setItem('_t', '1'); localStorage.removeItem('_t'); return localStorage; } catch {
  const m = new Map();
  return { getItem: k => m.has(k) ? m.get(k) : null, setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k),
    key: i => [...m.keys()][i], get length() { return m.size; } };
} })();

/* seed(c) lives in src/schemas, which hands it over with set_seeder(seed) when it loads. db.js does not import the schemas
   (or feedback) at the top: they reach every view, and the store, app_state included, must be ready before any view runs. */
let seeder = null;
export const set_seeder = fn => { seeder = fn; };
const storage_full = () => import('../feedback/index.js')
  .then(m => m.notify('Export a backup, then reset demo data in Settings to free space.', 'bad', 'Browser storage is full'));

export const db = {
  get(k, d = null) { try { const v = ls.getItem(cfg.ns + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { ls.setItem(cfg.ns + k, JSON.stringify(v)); return true; } catch { storage_full(); return false; } },
  del(k) { ls.removeItem(cfg.ns + k); },
  keys() { const o = []; for (let i = 0; i < ls.length; i++) { const k = ls.key(i); if (k && k.startsWith(cfg.ns)) o.push(k.slice(cfg.ns.length)); } return o; },
  list(c) { let v = db.get('c:' + c); if (!Array.isArray(v)) { if (!seeder) return []; v = seeder(c); db.set('c:' + c, v); } return v; },
  save(c, rows) { db.set('c:' + c, rows); },
  find(c, id) { return db.list(c).find(r => r.id === id); },
  upsert(c, row) {
    const rows = db.list(c), id = row.id || uid(), i = rows.findIndex(r => r.id === id);
    if (i > -1) rows[i] = { ...rows[i], ...row }; else rows.unshift({ ...row, id }); db.save(c, rows); return id;
  },
  remove(c, id) { db.save(c, db.list(c).filter(r => r.id !== id)); },
  bytes() { return db.keys().reduce((n, k) => n + (k.length + (ls.getItem(cfg.ns + k) || '').length) * 2, 0); }
};
