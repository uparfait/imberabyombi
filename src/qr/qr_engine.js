/* qr/qr_engine.js: reading QR codes. The browser's own BarcodeDetector where it reads QR codes; elsewhere jsQR, loaded from
   the CDN the first time. start(video, on_code, facing) opens a camera (the back one by default) into video and reads a
   frame every 250 ms until a code is found (the camera then stops) or stop(); read_image(file) reads one picture.
   secure(text): the link, when the text is one that starts with https; else null. */
import { load_script } from '../editor/core/utils.js';
