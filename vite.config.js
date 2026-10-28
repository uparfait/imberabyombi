/* vite.config.js: the dev server (npm run dev) and the production build (npm run build → dist/).
   base './' keeps every asset path relative, so the built site works from any folder:
   GitHub Pages, a sub-path on a server, or any static host, without changing a setting. */
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
