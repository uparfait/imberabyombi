/* files/file_viewer.jsx: view_file(), one file in the #viewer dialog. Images, video, audio, PDF and any text/code file
   show inside; other types (and media the browser cannot play) get Open + Download (file_info). */
import { useEffect, useState } from 'react';
import { ic, i3 } from '../icons/index.js';
import { spinner } from '../feedback/index.js';
import { help_tip } from '../ui/index.js';
import { show_in_dialog, tip } from '../overlays/index.js';
import { VIEW, furl, fmt_size, file_kind, FICON } from './file_utils.js';
import { file_info } from './file_info.jsx';

/* a text or code file: its first 512 KB, read in the background (the spinner shows until then) */
function Text_view({ f }) {
  const [text, set_text] = useState(null);
  useEffect(() => {
    let live = true;
    f.slice(0, 512e3).text().then(s => { if (live) set_text(s + (f.size > 512e3 ? '\n\n… The preview shows the first 512 KB.' : '')); });
