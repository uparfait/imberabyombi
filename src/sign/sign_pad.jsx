/* sign/sign_pad.jsx: <Mark_pad kind name/>, the body of the "Add your signature / stamp" dialog. A signature is drawn,
   typed (five handwriting styles) or uploaded; a stamp is created (organisation, centre text, date, ink, shape) or uploaded,
   and an upload can lose its background. The tab on show sets PAD.get() (pad_state.js), which the dialog's button reads. */
import { useState } from 'react';
import { PAD } from './pad_state.js';
import { Pad_draw } from './pad_draw.jsx';
import { Pad_type } from './pad_type.jsx';
import { Pad_upload } from './pad_upload.jsx';
import { Stamp_make } from './stamp_make.jsx';

export { PAD };
const TABS = { signature: [['draw', 'Draw'], ['type', 'Type'], ['upload', 'Upload']], stamp: [['make', 'Create'], ['upload', 'Upload']] };

export function Mark_pad({ kind, name }) {
  const [tab, set_tab] = useState(TABS[kind][0][0]);
  const pick = k => { PAD.get = async () => null; set_tab(k); };
  return <div className="grid gap-4 sm:col-span-2">
