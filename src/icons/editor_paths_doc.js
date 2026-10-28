/* icons/editor_paths_doc.js: document editor icons, part 2: files and formats, clipboard, history, arrows and panels.
   24×24 stroke paths drawn like PATHS (round caps and joins, no fills). */
const FILE = 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6';
const BUBBLE = 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z';
const CLIP = 'M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2';
const BIN = 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6';
const dot = (x, y) => `M${x} ${y + 1}a1 1 0 1 0 0-2 1 1 0 0 0 0 2z`;

export const EDITOR_DOC_PATHS = {
  undo: 'M9 5 4 10l5 5M4 10h11a5 5 0 0 1 0 10h-3',
  redo: 'M15 5l5 5-5 5M20 10H9a5 5 0 0 0 0 10h3',
  print: 'M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z',
  upload_file: FILE + 'M12 18v-7M9 14l3-3 3 3',
  file_download: FILE + 'M12 11v7M9 15l3 3 3-3',
  cloud_upload: 'M7 18a5 5 0 1 1 .9-9.9A6 6 0 0 1 19 9.5a4.5 4.5 0 0 1-1 8.5M12 12v9M9 15l3-3 3 3',
  description: FILE + 'M8 13h8M8 17h8',
  note_add: FILE + 'M12 11v7M8.5 14.5h7',
  picture_as_pdf: FILE + 'M8 18v-5h1.5a1.5 1.5 0 0 1 0 3H8M13 13v5h1a2.5 2.5 0 0 0 0-5z',
  csv: FILE + 'M8 13v2.5L7 17M12 13v2.5L11 17M16 13v2.5L15 17',
  article: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM7 8h10M7 12h10M7 16h6',
  text_snippet: 'M4 4h16v10l-6 6H4zM14 20v-6h6M8 9h8M8 13h4',
  html: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  markdown: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM6 15V9l3 3 3-3v6M17 9v6M15 13l2 2 2-2',
  menu_book: 'M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z',
  data_object: 'M8 4H7a2 2 0 0 0-2 2v3.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 5 14.5V18a2 2 0 0 0 2 2h1'
    + 'M16 4h1a2 2 0 0 1 2 2v3.5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5V18a2 2 0 0 1-2 2h-1',
  folder_open: 'M3 19V5a1 1 0 0 1 1-1h5l2 2h7a1 1 0 0 1 1 1v3M3 19l2.6-7.3A1 1 0 0 1 6.5 11H21l-2.7 7.3a1 1 0 0 1-.9.7H3',
  attach_file: 'M21 11.5l-8.5 8.5a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4L15.5 7.5',
  content_cut: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12',
  content_copy: 'M9 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  content_paste: CLIP + 'h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3M9 3h6v3H9z',
