/* editor/io_import/badge.jsx: the file-type badges as JSX (the JSX twin of badge_html): a small page with a folded
   corner (a chosen file's row, class fmt_badge) and a flat pill (the formats list, class fmt_chip). Colours are data
   (file_badge: one colour per file type), like the download dialog's format badges. */
import { file_badge } from './file_helpers.js';

const PAGE = 'relative flex h-8 w-[26px] flex-none items-end justify-center rounded-[3px_8px_3px_3px] pb-1 text-[7.5px] font-bold leading-none '
  + 'tracking-[.02em] text-white';
