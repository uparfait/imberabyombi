/* qr/qr_install.js: installing Qr-scan on its own (its own manifest, so only the scanner is installed). The browser offers
   it (beforeinstallprompt): Install shows and asks; once installed, or opened as the app, it goes. iPhones and iPads make no
   offer: there it is Share, then Add to Home Screen, until it is installed (remembered in this browser once installed or
   opened as the app). on_change(fn) tells when that changes. */
import { cfg } from '../config/index.js';

const KEY = cfg.ns + 'qr_installed';
const mark = () => { try { localStorage.setItem(KEY, '1'); } catch { /* this visit only */ } };
export const installed = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };
let offer = null;
const subs = new Set(), emit = () => subs.forEach(f => f());
/* the browser offers it only while it is not installed (so an app removed later can be installed again) */
addEventListener('beforeinstallprompt', e => { e.preventDefault(); offer = e; try { localStorage.removeItem(KEY); } catch { /* fine */ } emit(); });
addEventListener('appinstalled', () => { offer = null; mark(); emit(); });

export const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
export const apple = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const can_install = () => !!offer;
export async function install() {
  if (!offer) return false; offer.prompt(); const { outcome } = await offer.userChoice; offer = null; emit(); return outcome === 'accepted';
}
export const on_change = f => { subs.add(f); return () => subs.delete(f); };
