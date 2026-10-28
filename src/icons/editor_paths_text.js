/* icons/editor_paths_text.js: document editor icons, part 1: text formatting, paragraphs, lists, styles and symbols.
   24×24 stroke paths drawn like PATHS (round caps and joins, no fills); dots are r=1 circles so they read at 18px. */
const dot = (x, y) => `M${x} ${y + 1}a1 1 0 1 0 0-2 1 1 0 0 0 0 2z`;

export const EDITOR_TEXT_PATHS = {
  add: 'M12 5v14M5 12h14',
  remove: 'M5 12h14',
  format_bold: 'M7 4h6a4 4 0 0 1 0 8H7zM7 12h7a4 4 0 0 1 0 8H7z',
  format_italic: 'M19 4h-9M14 20H5M15 4 9 20',
  format_underlined: 'M6 3v7a6 6 0 0 0 12 0V3M4 21h16',
  strikethrough_s: 'M4 12h16M16.5 6.5C16 5 14.3 4 12 4c-2.8 0-4.5 1.5-4.5 3.5 0 1.6 1 2.6 3 3.3M7.5 17c.6 1.8 2.3 3 4.7 3 2.8 0 4.6-1.4 4.6-3.6 0-1-.4-1.8-1.1-2.4',
  superscript: 'M3 9l8 9M11 9l-8 9M15 5a1.75 1.75 0 1 1 3 1.2L15 10h3.5',
