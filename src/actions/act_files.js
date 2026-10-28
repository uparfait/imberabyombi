/* actions/act_files.js: data-act handlers of the file tiles above a file field: open one in the viewer, remove one.
   Removing animates the tile, then writes the input's new FileList and sends `change`, so the file box redraws its tiles
   (fresh tile nodes: a faded one is never reused). */
import { reduced } from '../feedback/index.js';
import { FURL, view_file } from '../files/index.js';
