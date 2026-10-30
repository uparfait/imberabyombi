/* qr/qr_app.jsx: Qr-scan's screen: the camera on the whole page, on every screen and once installed. As it opens: allowed
   already, the camera starts; not asked yet, a sheet says why it needs the camera and Allow camera asks (the browser's
   own prompt); blocked, how to allow it, with Try again (it starts by itself once allowed). Over the camera, qr_live.jsx;
   it stops once it finds a code, and what it found comes up in a sheet from the bottom with Scan again. */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ic } from '../icons/index.js';
import { start, stop, has_torch, torch } from './qr_engine.js';
import { on_change, can_install, standalone } from './qr_install.js';
import { found_card } from './qr_parts.jsx';
import { qr_live } from './qr_live.jsx';

const WHY = { NotAllowedError: 'The camera is blocked. Allow it for this site in the browser’s settings, then try again.',
  NotFoundError: 'No camera was found.', NotReadableError: 'Another app is using the camera.' };

export function Qr_app() {
  useSyncExternalStore(on_change, can_install);   /* Install shows when the browser offers it */
  const video = useRef(null), [st, set] = useState({ phase: 'start' }), [cam, set_cam] = useState({ torch: false, lit: false });
  const found = t => { set({ phase: 'found', text: t }); navigator.vibrate?.(60); };
  const go = async () => {
    if (!navigator.mediaDevices?.getUserMedia) return set({ phase: 'error', msg: 'The camera needs a secure page (https).' });
    set({ phase: 'scan' });
    try { await start(video.current, found); set_cam({ torch: has_torch(), lit: false }); }
    catch (e) { stop(); set({ phase: 'error', msg: WHY[e.name] || 'The camera could not start.' }); }
  };
  useEffect(() => { let perm;   /* the camera's permission, where the browser tells it */
    navigator.permissions?.query({ name: 'camera' }).then(p => { perm = p; p.onchange = () => p.state === 'granted' && go();
      p.state === 'granted' ? go() : set(p.state === 'denied' ? { phase: 'error', msg: WHY.NotAllowedError } : { phase: 'ask' }); }, () => set({ phase: 'ask' }))
      ?? set({ phase: 'ask' });
    return () => { if (perm) perm.onchange = null; stop(); }; }, []);   // eslint-disable-line react-hooks/exhaustive-deps
  const scanning = st.phase === 'scan' || st.phase === 'start';

  return <div className="qr_app"><div className={`qr_view ${st.phase === 'scan' ? 'on' : ''}`}>
    <video ref={video} muted playsInline />
    {qr_live({ app: standalone(), scanning, has_torch: cam.torch, lit: cam.lit,
      toggle_torch: () => { torch(!cam.lit); set_cam({ ...cam, lit: !cam.lit }); } })}
}
