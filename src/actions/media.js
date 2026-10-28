/* actions/media.js: the audio / video player (wired once per [data-mp] wrapper after a render), the smooth <details>
   open / close, and the message shown when a media file cannot load. */
import { pad, lorem } from '../lib/index.js';
import { reduced, show_msg } from '../feedback/index.js';
import { fill_range } from './theme.js';

export function init_player(w) {
  const m = w.querySelector('video,audio'), seek = w.querySelector('[data-mp-seek]'), out = w.querySelector('[data-mp-time]'), tr = w.querySelector('track[data-vtt]'); if (!m || w._m) return; w._m = m;
  if (tr) tr.src = URL.createObjectURL(new Blob([`WEBVTT\n\n00:00.000 --> 00:02.500\n${lorem.t(4)}\n\n00:02.500 --> 00:05.000\n${lorem.t(3)}\n`], { type: 'text/vtt' }));
  const fmt = s => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
