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
    return () => { live = false; };
  }, [f]);
  return <pre className="m-0 min-h-[12rem] whitespace-pre-wrap rounded-none text-sm" data-text="">{text ?? spinner('mx-auto')}</pre>;
}

/* the dialog's content: header (icon, name, help tip, Open in a new tab, Download, Close) + the file */
function File_view({ f, n }) {
  const k = file_kind(f), u = furl(f), [failed, set_failed] = useState(false), err = () => set_failed(true);
  useEffect(() => () => { if (VIEW.n === n) VIEW.f = null; }, [n]);   /* the viewer closed (not another file opened) */
