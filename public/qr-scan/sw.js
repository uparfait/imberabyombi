/* public/qr-scan/sw.js: Qr-scan's service worker (scope /qr-scan/, so it serves Qr-scan alone, never the site's other
   pages): the installed app opens without a connection. Every GET of Qr-scan is fetched from the network first and a copy
   kept; offline, the kept copy is used (the page itself as the last resort). Keeping copies is a bonus: where the browser
   cannot (private windows, full storage), it still installs and works online. Bump CACHE to start the copies over. */
