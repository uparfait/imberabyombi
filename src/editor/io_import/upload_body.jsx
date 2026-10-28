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
const MODES = [['insert', 'At the cursor'], ['tab', 'In new tabs'], ['replace', 'Replace document']];
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
