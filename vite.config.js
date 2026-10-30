/* vite.config.js: the dev server (npm run dev) and the production build (npm run build → dist/).
   base: the path the site is served from. '/' by default (the domain root); set BASE_PATH to serve it from a folder,
   for example GitHub Pages: BASE_PATH=/<repo>/ npm run build. Links in the app follow it (to() in src/router).
   Two pages are built: the site (index.html) and Qr-scan (qr-scan/index.html, an app of its own, installable alone). */
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/* Single-page fallback: dist/404.html is a copy of dist/index.html, so hosts that serve 404.html for unknown paths
   (GitHub Pages, many static hosts) open the app on every route, deep links and reloads included */
const spa_fallback = () => {
  let out = 'dist';
  return {
    name: 'spa_fallback',
    apply: 'build',
    configResolved(c) { out = resolve(c.root, c.build.outDir); },
    closeBundle() { copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html')); }
  };
};

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), spa_fallback()],
  build: {
    target: 'es2020',          /* modern browsers, including older phones still in use */
    cssCodeSplit: true,        /* lazy pages bring only their own CSS */
    reportCompressedSize: true, /* shows the gzip size of every file after a build */
    rolldownOptions: {
      input: { main: resolve(import.meta.dirname, 'index.html'), qr: resolve(import.meta.dirname, 'qr-scan/index.html') },
      output: {
        /* React in its own file: it rarely changes, so returning visitors keep it cached when the site is updated */
        codeSplitting: { groups: [{ name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ }] }
      }
    }
  }
});
