/* modules/task_files.jsx: attachments in the task view: one row per file (thumbnail or icon, name, size, remove) and the
   preview shown inside the view (images, video, audio, PDF, text); other files are opened in the full viewer. */
import { useEffect, useState } from 'react';
import { ic, i3 } from '../icons/index.js';
import { file_kind, FICON, fmt_size } from '../files/index.js';

/* f: the file, id: the task, i: its place in the list, own: may remove it, on: it is the one being previewed */
export const file_chip = (f, id, i, own, on = false) => { const k = file_kind(f);
  return <div key={i} className="task_file">
    <button type="button" className={on ? 'task_file_open active' : 'task_file_open'} data-act="task_file" data-id={id} data-i={i}>
      {f.url && k === 'image' ? <img src={f.url} alt="" /> : <span className="task_file_ico">{ic(FICON[k], 'h-5 w-5')}</span>}
      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{f.name}</span>
        <small className="text-muted">{fmt_size(f.size)}</small></span></button>
    {own ? <button type="button" className="icon_btn h-8 w-8 shrink-0" data-act="task_file_rm" data-id={id} data-i={i} aria-label={`Remove ${f.name}`}>
      {ic('x', 'h-4 w-4')}</button> : null}</div>; };

/* a text attachment: "…" until its first 20 000 characters are read */
function Text_pre({ url }) {
  const [text, set_text] = useState('…');
  useEffect(() => { let on = true; fetch(url).then(x => x.text()).then(t => { if (on) set_text(t.slice(0, 20000)); }).catch(() => {});
    return () => { on = false; }; }, [url]);
  return <pre className="task_pre" data-text="">{text}</pre>;
}

/* how each kind shows inside the view; a kind not listed opens in the full viewer */
const MEDIA = {
  image: f => <img src={f.url} alt={f.name} className="mx-auto max-h-72 w-auto rounded-xl bg-transparent" />,
  video: f => <video src={f.url} controls playsInline className="max-h-72 w-full rounded-xl bg-ink"></video>,
  audio: f => <audio src={f.url} controls className="w-full"></audio>,
  pdf: f => <iframe src={f.url} title={f.name} className="h-72 w-full rounded-xl border border-line"></iframe>,
  text: f => <Text_pre url={f.url} />
};

/* an attachment shown inside the task view (images, video, audio, PDF, text); others are opened in the full viewer */
export function file_preview(f) {
  if (!f.url) return <p className="text-sm text-muted">{`${f.name} is larger than 1 MB, so this demo kept only its name.`}</p>;
  const media = MEDIA[file_kind(f)];
  return <>{media ? media(f) : <div className="grid justify-items-center gap-2 py-4 text-center">{i3('file', 'h-12 w-12', 'info')}
    <p className="text-sm text-muted">This type of file opens in the full viewer.</p></div>}
    <div className="mt-2 flex flex-wrap items-center justify-between gap-2"><span className="min-w-0 truncate text-sm font-medium">{f.name}</span>
      <span className="flex gap-1"><button type="button" className="btn btn_ghost btn_sm" data-act="task_file_full">{ic('external', 'h-4 w-4')}Full view</button>
        <button type="button" className="btn btn_ghost btn_sm" data-act="task_file_close">Close</button></span></div></>;
}
