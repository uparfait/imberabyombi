/* icons/editor_paths_text.js: document editor icons, part 1: text formatting, paragraphs, lists, styles and symbols.
   24×24 stroke paths drawn like PATHS (round caps and joins, no fills); dots are r=1 circles so they read at 18px. */
const dot = (x, y) => `M${x} ${y + 1}a1 1 0 1 0 0-2 1 1 0 0 0 0 2z`;

export const EDITOR_TEXT_PATHS = {
