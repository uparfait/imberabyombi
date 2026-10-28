/* modules/task_files.jsx: attachments in the task view: one row per file (thumbnail or icon, name, size, remove) and the
   preview shown inside the view (images, video, audio, PDF, text); other files are opened in the full viewer. */
import { useEffect, useState } from 'react';
import { ic, i3 } from '../icons/index.js';
import { file_kind, FICON, fmt_size } from '../files/index.js';

/* f: the file, id: the task, i: its place in the list, own: may remove it, on: it is the one being previewed */
