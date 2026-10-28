/* editor/io_import/upload_body.jsx: the upload dialog's content (drop zone, the chosen files with their badge, size
   and a remove button, "Where should the content go?", the formats that become editable) and its footer (Cancel,
   Add file / Add N files). Body and footer share a small store: up.get() → { files, m }, up.set(patch).
   Also the "could not be added" dialog (show_failed). */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ic } from '../../icons/index.js';
import { modal } from '../../overlays/index.js';
import { qs } from '../core/index.js';
import { after_close } from '../format/index.js';
import { ext_of, fmt_size } from './file_helpers.js';
import { badge, fmt_chip } from './badge.jsx';

export function upload_store(files, m) {
  let s = { files, m }; const subs = new Set();
  return { get: () => s, set: p => { s = { ...s, ...p }; subs.forEach(f => f()); }, sub: f => { subs.add(f); return () => subs.delete(f); } };
}
const use_up = up => useSyncExternalStore(up.sub, up.get);
const CHIPS = ['docx', 'pdf', 'xlsx', 'xls', 'ods', 'csv', 'json', 'pptx', 'odt', 'odp', 'rtf', 'epub', 'html', 'md', 'txt'];
const MODES = [['insert', 'At the cursor'], ['tab', 'In new tabs'], ['replace', 'Replace this tab']];
const ZONE = 'drop_zone cursor-pointer rounded-2xl border-2 border-dashed px-4 py-6 text-center text-muted transition hover:border-brand hover:bg-brand/10';
const FLD = 'fld mb-1.5 mt-3 block text-sm text-muted', SEG_ON = 'bg-brand/15 text-accent', SEG_OFF = 'text-fg/80 hover:bg-fg/5';

export function Upload_body({ up }) {
  const { files, m } = use_up(up), zone = useRef(null), input = useRef(null), [over, set_over] = useState(false);
  const add = fl => up.set({ files: [...up.get().files, ...Array.from(fl || [])] });
  useEffect(() => { const t = setTimeout(() => zone.current?.focus(), 60); return () => clearTimeout(t); }, []);
  const drag_in = e => { e.preventDefault(); e.stopPropagation(); set_over(true); };
  const drag_out = e => { e.preventDefault(); e.stopPropagation(); set_over(false); if (e.type === 'drop') add(e.dataTransfer.files); };
  const key = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.current.click(); } };
  return (
    <div className="sm:col-span-2">
      <div ref={zone} className={`${ZONE} ${over ? 'over border-brand bg-brand/10' : 'border-line'}`} tabIndex={0} role="button" aria-label="Choose files to upload"
        onClick={() => input.current.click()} onKeyDown={key} onDragEnter={drag_in} onDragOver={drag_in} onDragLeave={drag_out} onDrop={drag_out}>
        {ic('cloud_upload', 'mx-auto h-10 w-10 text-brand')}
        <div className="mt-1.5 text-[15px] text-fg">Drag files here or <span className="font-medium text-accent">browse your computer</span></div>
        <div className="mt-1 text-xs">Add as many as you like, up to 25 MB each</div>
      </div>
      <div className="up_list mt-2 max-h-[190px] overflow-auto">
        {files.map((f, i) => (
          <div key={i + ':' + f.name} className="file_row flex items-center gap-2.5 border-b border-line px-1 py-1.5 text-[13px]">
            {badge(ext_of(f.name))}<span className="min-w-0 flex-1 truncate">{f.name}</span><span className="text-muted">{fmt_size(f.size)}</span>
            <button type="button" className="icon_btn sm h-7 w-7" aria-label={`Remove ${f.name}`} onClick={() => up.set({ files: files.filter((_, k) => k !== i) })}>
              {ic('close', 'h-5 w-5')}</button>
          </div>
        ))}
      </div>
      <label className={FLD}>Where should the content go?</label>
      <div className="seg up_mode">
        {MODES.map(([k, l], i) => (
          <button key={k} type="button" data-m={k} aria-pressed={String(k === m)} onClick={() => up.set({ m: k })}
            className={`px-4 py-2 text-sm font-medium transition ${i ? 'border-l border-muted/50' : ''} ${k === m ? SEG_ON : SEG_OFF}`}>{l}</button>
        ))}
      </div>
      <label className={FLD}>Turned into editable text, tables and images</label>
      <div className="fmt_chips flex flex-wrap gap-1">{CHIPS.map(e => badge(e, 'fmt_chip'))}{fmt_chip('IMAGES', '#9334e6')}{fmt_chip('CODE', '#1a73e8')}</div>
      <p className="mt-2 text-xs text-muted">Any other file, such as a zip, audio or video, is added as an attachment that can be downloaded from the document.</p>
      <input ref={input} type="file" multiple style={{ display: 'none' }} onChange={e => { add(e.target.files); e.target.value = ''; }} />
    </div>
  );
}
/* the footer: Cancel and the submit button, whose label follows the number of files */
export function Upload_actions({ up }) {
  const { files } = use_up(up);
  return (
    <>
      <button type="button" className="btn btn_ghost" data-act="close_modal">Cancel</button>
      <button className="btn btn_primary">{files.length > 1 ? `Add ${files.length} files` : 'Add file'}</button>
    </>
  );
}
/* the files that failed, one per line, with an OK button (after the confirm, if that is still closing) */
export function show_failed(failed, any_done) {
  if (qs('#modal')?.classList.contains('closing')) return after_close(() => show_failed(failed, any_done));
  modal({ title: any_done ? 'Some files could not be added' : 'The files could not be added',
    body: <ul className="list-disc pl-[18px] text-muted sm:col-span-2">{failed.map((f, i) => <li key={i} className="my-1">{f}</li>)}</ul>,
    actions: <button type="button" className="btn btn_primary" data-act="close_modal">OK</button> });
}
