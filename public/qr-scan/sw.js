/* public/qr-scan/sw.js: Qr-scan's service worker (scope /qr-scan/, so it serves Qr-scan alone, never the site's other
   pages): the installed app opens without a connection. Every GET of Qr-scan is fetched from the network first and a copy
   kept; offline, the kept copy is used (the page itself as the last resort). Keeping copies is a bonus: where the browser
   cannot (private windows, full storage), it still installs and works online. Bump CACHE to start the copies over. */
const CACHE = 'qr-scan-v1';
const keep = (r, res) => caches.open(CACHE).then(c => c.put(r, res)).catch(() => {});
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.add('./')).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(ks => Promise.all(ks.filter(k => k.startsWith('qr-scan-') && k !== CACHE).map(k => caches.delete(k)))).catch(() => {}).then(() => self.clients.claim())));
