/* editor/io_export/download_dialog.jsx: Download (the template's modal): the file name with the format's extension,
   the format cards (click picks one, double-click downloads at once), this tab / all tabs, the PDF quality and a summary
   of what is saved. Download (or Enter) writes the file; on an error the message shows and the dialog stays open. */
import { useEffect, useState } from 'react';
import { ic } from '../../icons/index.js';
import { modal } from '../../overlays/index.js';
import { state, qs, file_base, toast, hist_timer, commit } from '../core/index.js';
import { FORMATS, doc_stats, do_export } from './formats.js';

/* the format badge (a page with a folded corner, in the format's colour) and the file name box (field look, extension after it) */
const BADGE = 'relative flex h-11 w-9 flex-none items-end justify-center rounded-[4px_11px_4px_4px] pb-1.5 text-[9.5px] font-bold leading-none '
  + 'tracking-[.02em] text-white';
const NAME_BOX = 'flex items-stretch overflow-hidden rounded-xl border border-muted/60 bg-surface focus-within:border-brand focus-within:outline '
  + 'focus-within:outline-1 focus-within:outline-offset-[-2px] focus-within:outline-brand';
const count = (n, one, many) => n ? `${n} ${n === 1 ? one : many}` : '';
function summary(fmt, s) {
  let sum = [count(s.pages, 'page', 'pages'), `${s.words.toLocaleString()} ${s.words === 1 ? 'word' : 'words'}`, count(s.tables, 'table', 'tables'),
    count(s.images, 'image', 'images')].filter(Boolean).join(', ') + '.';
  if ((fmt === 'xlsx' || fmt === 'csv') && !s.tables) sum += ' There are no tables, so each paragraph becomes one row.';
  if (fmt === 'pdf') sum += ' Pages are saved as pictures. For text you can select, use Print and choose Save as PDF.';
  if (fmt === 'json') sum += ' Includes every tab, the page setup and comments.';
  return sum;
}
/* a segmented choice (pill), styled like the template's .seg */
const seg = (label, opts, cur, pick) => (
  <div className="flex items-center gap-3"><span className="text-[13px] text-muted">{label}</span>
    <div className="seg">{opts.map(([v, l], i) => (
      <button key={l} type="button" aria-pressed={String(v === cur)} onClick={() => pick(v)}
        className={`px-4 py-2 text-sm font-medium transition ${i ? 'border-l border-muted/50' : ''} ${v === cur
          ? 'bg-brand/15 text-accent' : 'text-fg/80 hover:bg-fg/5'}`}>{l}</button>))}
    </div></div>
);
const fmt_card = (f, on, pick) => (
  <button key={f.key} type="button" role="radio" aria-checked={String(on)} aria-pressed={String(on)} data-f={f.key} onClick={() => pick(f.key)}
    onDoubleClick={e => { pick(f.key); const fm = e.currentTarget.form; if (fm && !fm.querySelector('[aria-busy]')) fm.requestSubmit(); }}
    className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-fg transition ${on
      ? 'border-brand bg-brand/10 outline outline-1 outline-offset-[-2px] outline-brand' : 'border-line bg-surface hover:bg-fg/5'}`}>
    <span className={BADGE} style={{ background: f.color }}><span className="absolute right-0 top-0 h-[11px] w-[11px] rounded-bl bg-white/40"></span>{f.ext.toUpperCase()}</span>
    <span className="min-w-0"><span className="block text-sm font-medium">{f.name}</span>
      <span className={`mt-0.5 block text-xs leading-snug ${on ? 'opacity-80' : 'text-muted'}`}>{f.desc}</span></span>
  </button>
);

/* opt: { fmt, scope, quality, multi, busy }, shared with the submit handler */
function Download_body({ opt }) {
  const [, set_n] = useState(0), f = FORMATS.find(x => x.key === opt.fmt);
  const set = k => v => { opt[k] = v; set_n(n => n + 1); };
  useEffect(() => { const t = setTimeout(() => { const n = qs('#dl_name'); if (n) { n.focus(); n.select(); } }, 60); return () => clearTimeout(t); }, []);
  const s = doc_stats(f.tabs ? opt.scope : 'all'), scope_on = opt.multi && f.tabs;
