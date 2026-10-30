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
  let body;   /* media the browser cannot play shows Open + Download instead */
  if (failed || k === 'file') body = file_info(f);
  else if (k === 'image') body = <img src={u} alt={f.name} className="mx-auto block max-h-[78dvh] w-auto bg-transparent object-contain" onError={err} />;
  else if (k === 'video') body = <video src={u} controls autoPlay playsInline className="mx-auto block max-h-[78dvh] w-full bg-ink" onError={err}></video>;
  else if (k === 'audio') body = (
    <div className="grid justify-items-center gap-6 px-4 py-12">{i3('music', 'h-20 w-20', 'violet')}<audio src={u} controls autoPlay className="w-full max-w-md" onError={err}></audio></div>);
  else if (k === 'pdf') body = <iframe src={u} title={f.name} className="h-[78dvh] rounded-none bg-transparent"></iframe>;
  else body = <Text_view f={f} />;
  return (
    <>
      <header className="flex items-center gap-2 py-2 pl-4 pr-2">{ic(FICON[k], 'h-5 w-5 shrink-0 text-muted')}
