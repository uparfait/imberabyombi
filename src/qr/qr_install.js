/* qr/qr_install.js: installing Qr-scan on its own (its own manifest, so only the scanner is installed). The browser offers
   it (beforeinstallprompt): Install shows and asks; once installed, or opened as the app, it goes. iPhones and iPads make no
   offer: there it is Share, then Add to Home Screen. on_change(fn) tells when that changes. */
let offer = null;
const subs = new Set(), emit = () => subs.forEach(f => f());
addEventListener('beforeinstallprompt', e => { e.preventDefault(); offer = e; emit(); });
addEventListener('appinstalled', () => { offer = null; emit(); });

export const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
export const apple = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const can_install = () => !!offer;
export async function install() {
  if (!offer) return false; offer.prompt(); const { outcome } = await offer.userChoice; offer = null; emit(); return outcome === 'accepted';
