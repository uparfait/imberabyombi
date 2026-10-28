/* icons/editor_paths_media.js: document editor icons, part 3: tables, images, page and view tools.
   24×24 stroke paths drawn like PATHS (round caps and joins, no fills). */
const BOX = 'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z';
const WIDE = 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z';

export const EDITOR_MEDIA_PATHS = {
  table: BOX + 'M3 10h18M3 15h18M9 4v16M15 4v16',
  table_rows: BOX + 'M3 9.5h18M3 14.5h18',
  table_view: BOX + 'M3 9h18M9 9v11M3 14.5h18',
  view_column: BOX + 'M9 4v16M15 4v16',
  view_agenda: 'M4 4h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM4 13h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z',
  add_row_above: 'M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 15h16M12 10v10M12 2v6M9 5h6',
  add_row_below: 'M4 14h16V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1zM4 9h16M12 4v10M12 16v6M9 19h6',
  add_column_left: 'M10 4h9a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-9zM15 4v16M10 12h10M5 9v6M2 12h6',
  add_column_right: 'M14 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h9zM9 4v16M4 12h10M19 9v6M16 12h6',
  call_merge: 'M12 3v8l-6 8M12 11l6 8M8 7l4-4 4 4',
  call_split: 'M12 21v-8L4 5M12 13l8-8M4 10V5h5M20 10V5h-5',
  vertical_align_top: 'M4 3h16M12 21V8M8 12l4-4 4 4',
  vertical_align_center: 'M4 12h16M12 2v6M9 5l3 3 3-3M12 22v-6M9 19l3-3 3 3',
  vertical_align_bottom: 'M4 21h16M12 3v13M8 12l4 4 4-4',
  border_style: 'M4 20V4h16M8 20h2M14 20h2M20 20h.01M20 14v2M20 8v2',
  border_color: 'M4 21h16M14.5 4.5l3 3L9 16H6v-3z',
