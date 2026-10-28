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
