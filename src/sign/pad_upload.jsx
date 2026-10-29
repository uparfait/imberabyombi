/* sign/pad_upload.jsx: <Pad_upload kind/>, a picture of your signature or stamp (PNG, JPG or WebP, up to 5 MB), shown on a
   checkerboard so what is transparent is plain to see. "Remove background" makes the paper transparent (bg_cut.js): it
   starts part-way for a picture with paper around it; slide right until only the ink is left. Its mark is the picture
   as shown, cut to its visible part. */
import { useEffect, useRef, useState } from 'react';
import { i3 } from '../icons/index.js';
import { form_msg } from '../feedback/index.js';
import { PAD, trim } from './pad_state.js';
import { paint, solid_edges } from './bg_cut.js';

export function Pad_upload({ kind }) {
  const cv = useRef(null), [img, set_img] = useState(null), [cut, set_cut] = useState(0);
  useEffect(() => { if (img) paint(cv.current, img, cut); }, [img, cut]);
  PAD.get = async () => img ? trim(cv.current, 6) : null;

  /* f: the chosen file; form: the dialog's form, where a problem is shown */
  const pick = (f, form) => {
    const say = (title, text) => form_msg(form, 'warn', title, text);
    if (!f) return;
    if (!/^image\/(png|jpeg|webp)$/.test(f.type)) return say('Not a picture', 'Choose a PNG, JPG or WebP picture.');
    if (f.size > 5 * 1048576) return say('The picture is too large', 'Choose a picture of 5 MB or less.');
    const el = new Image(), url = URL.createObjectURL(f);
    el.onload = () => { set_cut(solid_edges(el) ? 30 : 0); set_img(el); URL.revokeObjectURL(url); };
    el.onerror = () => { URL.revokeObjectURL(url); say('Unreadable picture', 'This picture could not be opened.'); };
    el.src = url;
  };
  const input = <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only"
