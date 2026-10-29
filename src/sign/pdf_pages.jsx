/* sign/pdf_pages.jsx: <Pdf_pages doc layer/>, a document's pages one under the other, as wide as their column. Each page
   keeps its shape from the first draw (its size is in the record), so the fields sit in place before the PDF has opened;
   a page is painted when it comes near the screen and again when its width changes. layer(i) = the fields over page i. */
import { useEffect, useRef, useState } from 'react';
import { spinner } from '../feedback/index.js';
import { empty } from '../ui/index.js';
import { open_pdf, draw_page } from './pdf_lib.js';

function Page({ pdf, i, n, size, children }) {
  const box = useRef(null), cv = useRef(null);
  useEffect(() => {
    if (!pdf) return; const el = box.current; let near = false, drawn = 0, t = 0, live = true;
    const draw = () => { const w = Math.round(el.clientWidth); if (!near || !w || Math.abs(w - drawn) < 2) return; drawn = w;
      draw_page(pdf, i, cv.current, w).then(() => live && el.classList.add('drawn'), () => { drawn = 0; }); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { near = true; draw(); } }, { rootMargin: '900px 0px' });
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(draw, 160); });
    io.observe(el); ro.observe(el);
    return () => { live = false; io.disconnect(); ro.disconnect(); clearTimeout(t); };
  }, [pdf, i]);
  return <figure className="sign_fig">
    <div ref={box} className="sign_sheet" data-page={i} style={{ aspectRatio: `${size.w} / ${size.h}` }}>
      <canvas ref={cv} aria-hidden="true" /><div className="sign_layer">{children}</div></div>
    <figcaption className="sign_pno">Page {i + 1} of {n}</figcaption></figure>;
}

export function Pdf_pages({ doc, layer }) {
  const [st, set] = useState({ pdf: null, err: null });
  useEffect(() => {
    let live = true; set({ pdf: null, err: null });
