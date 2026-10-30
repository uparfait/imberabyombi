/* qr/qr_main.jsx: Qr-scan's entry (qr-scan/index.html): the site's stylesheet and its own, the site's colours as set in
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import '../styles/overrides.css';
import './qr.css';
import { Qr_app } from './qr_app.jsx';

createRoot(document.getElementById('qr_root')).render(<Qr_app />);
const at = `${import.meta.env.BASE_URL}qr-scan/`;
if (import.meta.env.PROD && 'serviceWorker' in navigator) navigator.serviceWorker.register(`${at}sw.js`, { scope: at }).catch(() => {});
