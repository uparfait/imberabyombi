/* events/qr.jsx: <Qr text/>, a QR code of text as an SVG (dark squares on white, sharp at any size). The encoder
   (qrcode-generator) loads from the CDN the first time one is drawn; offline, the text shows instead. */
import { useEffect, useState } from 'react';
