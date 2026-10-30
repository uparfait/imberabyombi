/* qr/qr_app.jsx: Qr-scan's screen, phone first: the camera in a square viewfinder (Start camera; Stop and Flip while it
   scans; it stops by itself once it finds a code), Scan a picture (from the gallery or files), what was found and the
   recent scans (qr_parts.jsx; the last six, kept in this browser). */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ic } from '../icons/index.js';
