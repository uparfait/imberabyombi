/* qr/qr_app.jsx: Qr-scan's screen, phone first: the camera in a square viewfinder (Start camera; Stop and Flip while it
   scans; it stops by itself once it finds a code), Scan a picture (from the gallery or files), what was found and the
   recent scans (qr_parts.jsx; the last six, kept in this browser). */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ic } from '../icons/index.js';
import { start, stop, cameras, read_image } from './qr_engine.js';
import { on_change, can_install } from './qr_install.js';
import { top_bar, found_card, recent_list } from './qr_parts.jsx';

const KEY = 'loremds:v1:qr_recent';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const keep = r => { try { localStorage.setItem(KEY, JSON.stringify(r)); } catch { /* this visit only */ } };
const WHY = { NotAllowedError: 'The camera is blocked. Allow it for this site, or scan a picture.', NotFoundError: 'No camera here. Scan a picture instead.',
  NotReadableError: 'Another app is using the camera.' };

export function Qr_app() {
  useSyncExternalStore(on_change, can_install);   /* Install shows when the browser offers it */
  const video = useRef(null), [st, set] = useState({ phase: 'idle' }), [facing, set_facing] = useState('environment');
  const [multi, set_multi] = useState(false), [recent, set_recent] = useState(load);
  const found = t => { set({ phase: 'found', text: t }); navigator.vibrate?.(60);
    const r = [{ t, at: Date.now() }, ...load().filter(x => x.t !== t)].slice(0, 6); set_recent(r); keep(r); };
  const go = async (f = facing) => {
    if (!navigator.mediaDevices?.getUserMedia) return set({ phase: 'error', msg: 'The camera needs a secure page (https).' });
    set({ phase: 'scan' });
    try { await start(video.current, found, f); set_multi(await cameras() > 1); }
    catch (e) { stop(); set({ phase: 'error', msg: WHY[e.name] || 'The camera could not start. Scan a picture instead.' }); }
  };
  const pick = async e => { const file = e.target.files[0]; e.target.value = ''; if (!file) return; stop();
    try { const t = await read_image(file); t ? found(t) : set({ phase: 'error', msg: 'No QR code in that picture.' }); }
    catch { set({ phase: 'error', msg: 'That picture could not be read.' }); } };
  const flip = () => { const f = facing === 'environment' ? 'user' : 'environment'; set_facing(f); go(f); };
  useEffect(() => stop, []);
  const scanning = st.phase === 'scan';

  return <div className="qr_app">{top_bar()}
    <main className="qr_main">
      <div className={`qr_view ${scanning ? 'on' : ''}`}>
        <video ref={video} muted playsInline className={facing === 'user' ? 'mirror' : ''} />
        <i className="qr_corners" aria-hidden="true"></i>{scanning ? <i className="qr_line" aria-hidden="true"></i> : null}
        {scanning ? null : <div className="qr_idle">
          {st.phase === 'error' ? <p className="qr_err">{st.msg}</p>
            : <span className={`qr_idle_ic ${st.phase === 'found' ? 'ok' : ''}`}>{ic(st.phase === 'found' ? 'check' : 'qr', 'h-10 w-10')}</span>}
          <button type="button" className="btn btn_primary" onClick={() => go()}>{ic('play', 'h-4 w-4')}{st.phase === 'idle' ? 'Start camera' : 'Scan again'}</button></div>}
      </div>
      <div className="qr_tools">
        {scanning ? <button type="button" className="btn btn_outline btn_sm" onClick={() => { stop(); set({ phase: 'idle' }); }}>{ic('x', 'h-4 w-4')}Stop</button> : null}
        {scanning && multi ? <button type="button" className="btn btn_outline btn_sm" onClick={flip}>{ic('refresh', 'h-4 w-4')}Flip</button> : null}
        <label className="btn btn_outline btn_sm cursor-pointer">{ic('image', 'h-4 w-4')}Scan a picture<input type="file" accept="image/*" hidden onChange={pick} /></label>
      </div>
      {st.phase === 'found' ? found_card(st.text) : null}
