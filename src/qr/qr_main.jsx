/* qr/qr_main.jsx: Qr-scan's entry (qr-scan/index.html): the site's stylesheet and its own, the site's colours as set in
   Settings (qr_brand.js), the screen (qr_app.jsx), and in a build its service worker (public/qr-scan/sw.js), so the
   installed app opens offline. */
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import '../styles/overrides.css';
import './qr.css';
import { Qr_app } from './qr_app.jsx';
import { brand_apply } from './qr_brand.js';

brand_apply();

createRoot(document.getElementById('qr_root')).render(<Qr_app />);
const at = `${import.meta.env.BASE_URL}qr-scan/`;
if (import.meta.env.PROD && 'serviceWorker' in navigator) navigator.serviceWorker.register(`${at}sw.js`, { scope: at }).catch(() => {});
