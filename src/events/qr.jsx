/* events/qr.jsx: <Qr text/>, a QR code of text as an SVG (dark squares on white, sharp at any size). The encoder
   (qrcode-generator) loads from the CDN the first time one is drawn; offline, the text shows instead. */
import { useEffect, useState } from 'react';

const LIB = ['https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js', 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js'];
let lib = null;
