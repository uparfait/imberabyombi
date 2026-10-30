/* config/site_config.js: CONFIG. Brand, media and business rules in one place (name, logo, storage prefix,
   currency, simulated latency, table size, parking, work hours, storage cap, pictures, video/audio/map links).
   Pictures are cartoons drawn from a seed (src/cartoons: nothing to download); only the home hero is a real picture.
   The sample video is a cartoon too (public/media), with its first frame as the poster. */
import { cartoon, cartoon_face } from '../cartoons/index.js';

const BASE = import.meta.env.BASE_URL || '/';   // public files follow the site's base path

export const cfg = {
  name: 'Imberabyombi', logo: ['IMBERA', 'BYOMBI'] /* two-tone logo: first part in brand colour */, ns: window.NS || 'loremds:v1:',
  currency: 'USD', latency: 450 /* ms of simulated network time per request (saving, loading a table); set 0 or swap for fetch() */,
  page_size: 10 /* table rows per page */, parking_slots: 24, parking_rate: 2, overstay_hours: 8 /* a car parked longer is flagged (the bell) */, work_start: '08:00', storage_cap: 5 * 1024 * 1024,
  img: (seed, w = 900, h = 650) => cartoon(seed, w, h) /* a cartoon scene; the same seed always draws the same one */,
  face: (n, w = 320, h = w) => cartoon_face(n, w, h) /* a cartoon portrait (h > w for a tall card) */,
  hero: 'https://uparfait.github.io/uparfait/favicon.ico' /* home hero portrait */,
  video: BASE + 'media/sample_video.mp4' /* 8 s, 370 KB; loads only when played */, poster: BASE + 'media/sample_poster.webp',
  audio: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
  map: 'https://www.openstreetmap.org/export/embed.html?bbox=30.03%2C-1.98%2C30.12%2C-1.92&layer=mapnik'
};
