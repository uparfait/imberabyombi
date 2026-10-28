/* auth/session.js: who is signed in and what they may do. The session is kept in localStorage when "remember me" is on,
   otherwise in sessionStorage (ss; null when the browser blocks it). Plus the sign-in links shared with new people. */
import { cfg } from '../config/index.js';
import { db } from '../store/index.js';
import { roles } from './roles.jsx';

export const ss = (() => { try { sessionStorage.setItem('_t', 1); sessionStorage.removeItem('_t'); return sessionStorage; } catch { return null; } })();
export const auth = {
  get user() { return db.get('session') || (ss && JSON.parse(ss.getItem(cfg.ns + 'session') || 'null')); },
  login(u) { if (u.remember || !ss) db.set('session', u); else ss.setItem(cfg.ns + 'session', JSON.stringify(u)); },
  logout() { db.del('session'); ss && ss.removeItem(cfg.ns + 'session'); },
  role() { return roles().find(r => r.id === auth.user?.role); },
  can(mod, lvl = 1) { const r = auth.role(); if (!r) return false; if (r.perms === '*') return true; return (r.perms[mod] || 0) >= lvl; },
  boss() { const r = auth.role(); return r?.perms === '*' || r?.id === 'admin'; }
};
export const me = () => auth.user?.name || '';
export const base_url = () => location.href.split('#')[0];
export const invite_link = id => `${base_url()}#/login?role=${id}`;
