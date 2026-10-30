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
