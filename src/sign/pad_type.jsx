/* sign/pad_type.jsx: <Pad_type name/>, a typed signature: your name (it can be changed) in one of five handwriting styles,
   open-licence fonts served with the site (styles/sign/00_fonts.css; they download when this tab shows). Its mark is the
   name written in that style. */
import { useState } from 'react';
import { PAD, INK, trim } from './pad_state.js';

export const FONTS = ['Dancing Script', 'Great Vibes', 'Sacramento', 'Alex Brush', 'Caveat'];

async function typed(text, font) {
  const f = `72px "${font}"`; await document.fonts.load(f, text);
  const c = document.createElement('canvas'), x = c.getContext('2d', { willReadFrequently: true }); x.font = f;
  c.width = Math.ceil(x.measureText(text).width) + 90; c.height = 170;
  x.font = f; x.fillStyle = INK; x.textBaseline = 'middle'; x.fillText(text, 45, 88);
  return trim(c);
}

export function Pad_type({ name }) {
  const [text, set_text] = useState(name || ''), [font, set_font] = useState(0), shown = text.trim() || 'Your name';
  PAD.get = async () => text.trim() ? typed(text.trim(), FONTS[font]) : null;
  return <div className="grid gap-4">
    <div className="field"><label htmlFor="pad_name">Your name</label>
      <input id="pad_name" value={text} maxLength={40} placeholder=" " autoComplete="name" onChange={e => set_text(e.target.value)} /></div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Signature style">{FONTS.map((n, i) =>
