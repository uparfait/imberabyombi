/* store/db.js: STORE. ls = localStorage with an in-memory fallback (private mode, sandboxes); db = JSON values under the
   cfg.ns prefix, plus collections ('c:<name>': arrays of records) that seed themselves on first read. */
import { cfg } from '../config/index.js';
import { uid } from '../lib/index.js';

export const ls = (() => { try { localStorage.setItem('_t', '1'); localStorage.removeItem('_t'); return localStorage; } catch {
  const m = new Map();
