/* actions/media.js: the audio / video player (wired once per [data-mp] wrapper after a render), the smooth <details>
   open / close, and the message shown when a media file cannot load. */
import { pad, lorem } from '../lib/index.js';
import { reduced, show_msg } from '../feedback/index.js';
import { fill_range } from './theme.js';

export function init_player(w) {
  const m = w.querySelector('video,audio'), seek = w.querySelector('[data-mp-seek]'), out = w.querySelector('[data-mp-time]'), tr = w.querySelector('track[data-vtt]'); if (!m || w._m) return; w._m = m;
  if (tr) tr.src = URL.createObjectURL(new Blob([`WEBVTT\n\n00:00.000 --> 00:02.500\n${lorem.t(4)}\n\n00:02.500 --> 00:05.000\n${lorem.t(3)}\n`], { type: 'text/vtt' }));
  const fmt = s => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
  m.addEventListener('timeupdate', () => { if (m.duration) { seek.value = m.currentTime / m.duration * 100; fill_range(seek); } out.value = fmt(m.currentTime); });
  m.addEventListener('play', () => w.classList.add('playing')); m.addEventListener('pause', () => w.classList.remove('playing'));
  seek.addEventListener('input', () => { if (m.duration) m.currentTime = seek.value / 100 * m.duration; });
  w.querySelector('source')?.addEventListener('error', () => media_err(w));
}
/* <details> dropdowns (FAQ, help, legal) open and close with a smooth height animation */
export function toggle_details(d, e) {
  if (reduced() || !d.animate) return; e.preventDefault();
  const s = d.querySelector(':scope > summary'), open = !d.open, from = d.getBoundingClientRect().height;
  if (open) d.open = true;
  const to = open ? d.getBoundingClientRect().height : s.getBoundingClientRect().height + d.offsetHeight - d.clientHeight;
  d._a?.cancel(); d._a = d.animate([{ height: from + 'px' }, { height: to + 'px' }], { duration: 300, easing: 'cubic-bezier(.22,.8,.22,1)' });
  d._a.onfinish = () => { if (!open) d.open = false; d._a = null; };
