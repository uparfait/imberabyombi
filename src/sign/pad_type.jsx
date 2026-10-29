/* sign/pad_type.jsx: <Pad_type name/>, a typed signature: your name (it can be changed) in one of five handwriting styles,
   open-licence fonts served with the site (styles/sign/00_fonts.css; they download when this tab shows). Its mark is the
   name written in that style. */
import { useState } from 'react';
import { PAD, INK, trim } from './pad_state.js';

export const FONTS = ['Dancing Script', 'Great Vibes', 'Sacramento', 'Alex Brush', 'Caveat'];

async function typed(text, font) {
  const f = `72px "${font}"`; await document.fonts.load(f, text);
  const c = document.createElement('canvas'), x = c.getContext('2d', { willReadFrequently: true }); x.font = f;
