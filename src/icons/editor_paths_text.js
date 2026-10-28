/* icons/editor_paths_text.js: document editor icons, part 1: text formatting, paragraphs, lists, styles and symbols.
   24×24 stroke paths drawn like PATHS (round caps and joins, no fills); dots are r=1 circles so they read at 18px. */
const dot = (x, y) => `M${x} ${y + 1}a1 1 0 1 0 0-2 1 1 0 0 0 0 2z`;

export const EDITOR_TEXT_PATHS = {
  add: 'M12 5v14M5 12h14',
  remove: 'M5 12h14',
  format_bold: 'M7 4h6a4 4 0 0 1 0 8H7zM7 12h7a4 4 0 0 1 0 8H7z',
  format_italic: 'M19 4h-9M14 20H5M15 4 9 20',
  format_underlined: 'M6 3v7a6 6 0 0 0 12 0V3M4 21h16',
