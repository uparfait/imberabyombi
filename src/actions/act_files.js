/* actions/act_files.js: data-act handlers of the file tiles above a file field: open one in the viewer, remove one.
   Removing animates the tile, then writes the input's new FileList and sends `change`, so the file box redraws its tiles
   (fresh tile nodes: a faded one is never reused). */
import { reduced } from '../feedback/index.js';
import { FURL, view_file } from '../files/index.js';

export const FILE_ACT = {
  file_view: t => { const f = t.closest('.filebox')?._input?.files[+t.dataset.i]; if (f) view_file(f); },
  file_rm: async t => { const inp = t.closest('.filebox')?._input, tile = t.closest('.file'); if (!inp) return; const i = +t.dataset.i, dt = new DataTransfer();
    if (tile && !reduced()) { const w = tile.offsetWidth; tile.style.pointerEvents = 'none';
      await tile.animate([{ opacity: 1, transform: 'scale(1)', width: w + 'px' }, { opacity: 0, transform: 'scale(.6)', width: '0px', marginRight: '-.5rem', paddingLeft: 0, paddingRight: 0 }], { duration: 240, easing: 'cubic-bezier(.22,.8,.22,1)', fill: 'forwards' }).finished; }
    [...inp.files].forEach((f, j) => { if (j !== i) dt.items.add(f); else { URL.revokeObjectURL(FURL.get(f) || ''); FURL.delete(f); } });
    inp.files = dt.files; inp._quiet = true; inp.dispatchEvent(new Event('change', { bubbles: true })); }
};
