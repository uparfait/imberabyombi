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
    onChange={e => { pick(e.target.files[0], e.target.form); e.target.value = ''; }} />;

  if (!img) return <label className="sign_drop sm">{input}{i3('image', 'h-12 w-12')}
    <span className="mt-3 block font-medium">Choose a picture of your {kind}</span>
    <span className="mt-1 block text-xs text-muted">PNG, JPG or WebP, up to 5 MB. A photo on white paper works well.</span></label>;
  return <div className="grid gap-3">
    <div className="sign_checker"><canvas ref={cv} aria-label={`Your ${kind}`} /></div>
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between text-sm"><label htmlFor="pad_cut" className="font-medium">Remove background</label>
        <output htmlFor="pad_cut" className="tabular-nums text-muted">{cut}%</output></div>
      <input id="pad_cut" type="range" min="0" max="100" value={cut} onChange={e => set_cut(+e.target.value)} className="sign_range" />
      <p className="text-xs text-muted">Slide right until only the ink is left. The checkerboard shows what is transparent.</p></div>
