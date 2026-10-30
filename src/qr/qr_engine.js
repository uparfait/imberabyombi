/* qr/qr_engine.js: reading QR codes. The browser's own BarcodeDetector where it reads QR codes; elsewhere jsQR, loaded from
   the CDN the first time. start(video, on_code) opens the back camera into video and reads a
   frame every 250 ms until a code is found (the camera then stops) or stop(); has_torch() / torch(on): the phone's light,
   where the camera has one.
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
  const d = await reader();
  if (d) return (await d.detect(src))[0]?.rawValue || null;
  const k = Math.min(1, 900 / Math.max(w, h)); cv.width = Math.round(w * k); cv.height = Math.round(h * k);
  cx.drawImage(src, 0, 0, cv.width, cv.height); const px = cx.getImageData(0, 0, cv.width, cv.height);
  return window.jsQR(px.data, px.width, px.height, { inversionAttempts: 'attemptBoth' })?.data || null;
}

let stream = null, timer = 0;
export function stop() { clearTimeout(timer); stream?.getTracks().forEach(t => t.stop()); stream = null; }
export async function start(video, on_code) {
  stop(); await reader();
  stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
  video.srcObject = stream; await video.play();
  const tick = async () => { if (!stream) return;
    try { if (video.readyState >= 2) { const v = await decode(video, video.videoWidth, video.videoHeight); if (v) { stop(); on_code(v); return; } } } catch { /* the next frame */ }
    timer = setTimeout(tick, 250); };
  tick();
}
const track = () => stream?.getVideoTracks()[0];
export const secure = t => { try { const u = new URL(String(t).trim()); return u.protocol === 'https:' ? u.href : null; } catch { return null; } };
