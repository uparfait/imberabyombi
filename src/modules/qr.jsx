/* modules/qr.jsx: /admin/qr (from search, a module tile or a typed address) goes to Qr-scan, an app of its own on this
   site (qr-scan/index.html, src/qr/); the sidebar links to it directly. */
import { VIEWS } from './views.js';
import { loading } from '../feedback/index.js';
import { to } from '../router/index.js';

VIEWS.qr = () => { setTimeout(() => location.assign(to('/qr-scan/'))); return loading('Opening Qr-scan'); };
