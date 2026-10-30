/* events/qr_full.jsx: the attendance QR code on the whole screen (the browser's own full screen; where there is none,
   over the page), as large as the screen allows so people far away can scan it, with the title, the live count and the
   link beside it (under it on a tall screen); a long title stays on one line, whole on hover. Esc or × closes it. QR_ACT: its buttons. */
import { qs, qsa } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { copy_box } from '../overlays/index.js';
import { Qr } from './qr.jsx';

addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) qsa('.qr_full').forEach(el => { el.hidden = true; }); });

export const qr_full = (e, url, n) => <div id={`qr_full_${e.id}`} className="qr_full" hidden role="dialog" aria-label="Attendance QR code">
  <div className="qr_full_code"><Qr text={url} label="Attendance QR code" /></div>
  <div className="qr_full_info"><p className="att_kind">Scan to sign in</p><h2 className="qr_full_title">{e.title}</h2>
    <p className="qr_full_count"><b>{n}</b> attended</p>{copy_box(url, 'Link')}</div>
  <button type="button" className="icon_btn qr_full_x" data-act="qr_close" aria-label="Close" data-tip="Close (Esc)">{ic('x')}</button></div>;

export const QR_ACT = {
  ev_qr: t => { const el = qs('#qr_full_' + t.dataset.id); if (!el) return; el.hidden = false;
    Promise.resolve(el.requestFullscreen?.()).catch(() => {}); },
  qr_close: () => { if (document.fullscreenElement) document.exitFullscreen(); else qsa('.qr_full').forEach(el => { el.hidden = true; }); }
};
