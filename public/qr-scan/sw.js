/* public/qr-scan/sw.js: Qr-scan's service worker (scope /qr-scan/, so it serves Qr-scan alone, never the site's other
   pages): the installed app opens without a connection. Every GET of Qr-scan is fetched from the network first and a copy
