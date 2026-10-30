/* qr/qr_engine.js: reading QR codes. The browser's own BarcodeDetector where it reads QR codes; elsewhere jsQR, loaded from
   the CDN the first time. start(video, on_code, facing) opens a camera (the back one by default) into video and reads a
   frame every 250 ms until a code is found (the camera then stops) or stop(); read_image(file) reads one picture.
   secure(text): the link, when the text is one that starts with https; else null. */
import { load_script } from '../editor/core/utils.js';

const JSQR = ['https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js', 'https://unpkg.com/jsqr@1.4.0/dist/jsQR.js'];
let detector;   /* undefined: not chosen yet; null: jsQR */
async function reader() {
  if (detector !== undefined) return detector;
  if ('BarcodeDetector' in window) {
    try { if ((await BarcodeDetector.getSupportedFormats()).includes('qr_code')) return detector = new BarcodeDetector({ formats: ['qr_code'] }); } catch { /* jsQR below */ }
  }
  await load_script(JSQR); return detector = null;
}

const cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true });
async function decode(src, w, h) {
