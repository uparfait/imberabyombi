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
  subscript: 'M3 6l8 9M11 6l-8 9M15 16a1.75 1.75 0 1 1 3 1.2L15 21h3.5',
  format_clear: 'M5 6V4h13v2M11 4 8 20M6 20h5M15 14l6 6M21 14l-6 6',
  format_paint: 'M5 3h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM18 5.5h2a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1h-8v3M11 14h2v7h-2z',
  format_color_fill: 'M3 12l7-7 7 7-7 7zM10 5 7 2M3 12h14M20 15s-1.5 2-1.5 3a1.5 1.5 0 0 0 3 0c0-1-1.5-3-1.5-3z',
  format_color_reset: 'M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11zM4 4l16 16',
  ink_highlighter: 'M14 4l6 6-8 8-6-6zM6 12l-2 6 2 2 6-2M14 21h7',
  format_align_left: 'M3 5h18M3 10h12M3 15h18M3 20h12',
  format_align_center: 'M3 5h18M7 10h10M3 15h18M7 20h10',
  format_align_right: 'M3 5h18M9 10h12M3 15h18M9 20h12',
