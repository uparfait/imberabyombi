/* vite.config.js: the dev server (npm run dev) and the production build (npm run build → dist/).
   base './' keeps every asset path relative, so the built site works from any folder:
   GitHub Pages, a sub-path on a server, or any static host, without changing a setting. */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',          /* modern browsers, including older phones still in use */
    cssCodeSplit: true,        /* lazy pages bring only their own CSS */
    reportCompressedSize: true, /* shows the gzip size of every file after a build */
    rolldownOptions: {
      output: {
        /* React in its own file: it rarely changes, so returning visitors keep it cached when the site is updated */
        codeSplitting: { groups: [{ name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ }] }
      }
    }
  }
});
