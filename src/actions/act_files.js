/* actions/act_files.js: data-act handlers of the file tiles above a file field: open one in the viewer, remove one.
   Removing animates the tile, then writes the input's new FileList and sends `change`, so the file box redraws its tiles
   (fresh tile nodes: a faded one is never reused). */
import { reduced } from '../feedback/index.js';
import { FURL, view_file } from '../files/index.js';

export const FILE_ACT = {
  file_view: t => { const f = t.closest('.filebox')?._input?.files[+t.dataset.i]; if (f) view_file(f); },
  file_rm: async t => { const inp = t.closest('.filebox')?._input, tile = t.closest('.file'); if (!inp) return; const i = +t.dataset.i, dt = new DataTransfer();
