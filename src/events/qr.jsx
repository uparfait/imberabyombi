/* events/qr.jsx: <Qr text/>, a QR code of text as an SVG (dark squares on white, sharp at any size). The encoder
   (qrcode-generator) loads from the CDN the first time one is drawn; offline, the text shows instead. */
import { useEffect, useState } from 'react';

const LIB = ['https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js', 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js'];
let lib = null;
const load = () => lib ||= import('../editor/core/utils.js').then(u => u.load_script(LIB)).then(() => window.qrcode).catch(e => { lib = null; throw e; });

/* the dark squares as one path, n squares a side */
function draw(q, text) {
  const c = q(0, 'M'); c.addData(text); c.make(); const n = c.getModuleCount(); let d = '';
