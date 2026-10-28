/* editor/format/paint.js: paint format: start_paint() copies the character format at the caret (#paint_btn turns
   active); the next text selection gets it (apply_paint, run by the pages' mouseup while paint is set). */
import { refs, el_of, editable_of, to_hex, last_range, set_last, set_last_range, toast } from '../core/index.js';
import { exec, set_font_size } from './commands.js';

/* the copied format while paint format is on, else null (read-only outside: end it with stop_paint()) */
