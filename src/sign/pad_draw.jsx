/* sign/pad_draw.jsx: <Pad_draw/>, the drawing pad: smooth strokes that follow a finger, a pen or the mouse, sharp at the
   screen's pixel density, on white paper with a line to sign on. Clear starts again. Its mark is the drawn part, cut out. */
import { useEffect, useRef, useState } from 'react';
import { PAD, INK, trim } from './pad_state.js';

/* draws on canvas c; on_any(true / false) when it gets its first stroke or is cleared */
function wire(c, on_any) {
  const x = c.getContext('2d', { willReadFrequently: true }); let on = false, any = false, l, m;
  const fit = () => {
    if (any) return; const dpr = devicePixelRatio || 1;
    c.width = Math.round(c.clientWidth * dpr); c.height = Math.round(c.clientHeight * dpr); x.setTransform(dpr, 0, 0, dpr, 0, 0);
    Object.assign(x, { lineWidth: 2.6, lineCap: 'round', lineJoin: 'round', strokeStyle: INK, fillStyle: INK });
  };
  const at = e => { const b = c.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; };
  const down = e => {
    if (!any) fit(); on = true; c.setPointerCapture(e.pointerId); l = m = at(e);
    x.beginPath(); x.arc(l.x, l.y, 1.3, 0, 7); x.fill(); if (!any) { any = true; on_any(true); }
  };
  const move = e => { if (!on) return; const p = at(e), n = { x: (l.x + p.x) / 2, y: (l.y + p.y) / 2 };
