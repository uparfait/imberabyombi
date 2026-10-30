/* icons/paths.js: ICONS. One path dictionary feeds flat icons ic() and 3D icons i3() (24×24 stroke paths).
   Add an icon: a snake_case key and its path data. */
import { EDITOR_PATHS } from './editor_paths.js';
export const PATHS = { ...EDITOR_PATHS,   /* the document editor's icons first: the template's own keys below win */
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
