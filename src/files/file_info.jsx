/* files/file_info.jsx: what #viewer shows for a file the browser cannot display (or media it fails to play):
   the file's name, a short explanation, and Open (new tab) + Download. */
import { ic, i3 } from '../icons/index.js';
import { furl } from './file_utils.js';

export const file_info = f => (
  <div className="grid justify-items-center gap-3 px-6 py-14 text-center">
    {i3('file', 'h-16 w-16')}<p className="max-w-full truncate font-medium">{f.name}</p>
    <p className="max-w-sm text-sm text-muted">This type of file cannot be shown inside the browser. Open it in a new tab, or download it and open it with an app.</p>
