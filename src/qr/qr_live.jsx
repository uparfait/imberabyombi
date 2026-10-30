/* qr/qr_live.jsx: what is over the camera, like a scanner app. On top: the site's mark at the left (in the browser a way
   back to the site; the name beside it, not on a phone), then Install at the right (in the browser, until installed).
   While it scans: the scan window in the middle (the rest dimmed; the brand's corners and a sweeping line), "Point at a
   QR code" and Light (where the camera has one). */
import { ic, mark3d } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { brand } from './qr_brand.js';
import { Install } from './qr_parts.jsx';

const round = (icon, label, on, pressed) => <button type="button" className={`qr_round ${pressed ? 'on' : ''}`} onClick={on} aria-label={label}
  aria-pressed={pressed} title={label}>{ic(icon, 'h-5 w-5')}<span>{label}</span></button>;

/* o: { app (installed), scanning, has_torch, lit, toggle_torch } */
export const qr_live = o => { const mark = mark3d('#', 'h-9 w-9', brand());
  return <div className="qr_live">
    <div className="qr_live_top">
      {o.app ? <span className="qr_live_mark" aria-hidden="true">{mark}</span>
        : <a href={import.meta.env.BASE_URL} className="qr_live_mark" aria-label={`Back to ${cfg.name}`} title={cfg.name}>{mark}</a>}
      <span className="qr_live_name">Qr-scan</span>
      {o.app ? null : <Install />}</div>
    {o.scanning ? <>
      <div className="qr_window" aria-hidden="true"><i className="qr_corners"></i><i className="qr_line"></i></div>
