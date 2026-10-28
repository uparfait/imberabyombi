/* editor/io_import/badge.jsx: the file-type badges as JSX (the JSX twin of badge_html): a small page with a folded
   corner (a chosen file's row, class fmt_badge) and a flat pill (the formats list, class fmt_chip). Colours are data
   (file_badge: one colour per file type), like the download dialog's format badges. */
import { file_badge } from './file_helpers.js';

const PAGE = 'relative flex h-8 w-[26px] flex-none items-end justify-center rounded-[3px_8px_3px_3px] pb-1 text-[7.5px] font-bold leading-none '
  + 'tracking-[.02em] text-white';
const CORNER = 'absolute right-0 top-0 h-2 w-2 rounded-bl-[3px] bg-white/40';   /* the folded corner */
const PILL ='rounded-full px-1.5 py-1 text-[10.5px] font-semibold leading-none text-white';

/* a flat pill with a label and a colour (IMAGES, CODE, or a format) */
export const fmt_chip = (label, color, key = label) => <span key={key} className={`fmt_chip ${PILL}`} style={{ background: color }}>{label}</span>;
/* cls: 'fmt_badge' (page) or 'fmt_chip' (pill), as badge_html's cls */
export function badge(ext, cls = 'fmt_badge') {
