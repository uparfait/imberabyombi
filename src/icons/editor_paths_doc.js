/* icons/editor_paths_doc.js: document editor icons, part 2: files and formats, clipboard, history, arrows and panels.
   24×24 stroke paths drawn like PATHS (round caps and joins, no fills). */
const FILE = 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6';
const BUBBLE = 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z';
const CLIP = 'M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2';
const BIN = 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6';
const dot = (x, y) => `M${x} ${y + 1}a1 1 0 1 0 0-2 1 1 0 0 0 0 2z`;

export const EDITOR_DOC_PATHS = {
