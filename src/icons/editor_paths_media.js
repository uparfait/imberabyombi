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
  rounded_corner: 'M20 4h-6A10 10 0 0 0 4 14v6M20 12v.01M20 20h.01M12 20h.01',
  shadow: 'M4 4h12v12H4zM20 8v12H8',
  crop: 'M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2',
  flip: 'M12 3v3M12 10.5v3M12 18v3M9 7v11H3zM15 7v11h6z',
  swap_vert: 'M7 20V4M3 8l4-4 4 4M17 4v16M13 16l4 4 4-4',
  rotate_left: 'M3 4v5h5M4.5 14.9A8.5 8.5 0 1 0 6.5 6L3 9',
  rotate_right: 'M21 4v5h-5M19.5 14.9A8.5 8.5 0 1 1 17.5 6L21 9',
  restart_alt: 'M5.1 8A8 8 0 1 1 4 12M4 3v5h5M12 12h.01',
  straighten: 'M2 8h20v8H2zM6 8v3M10 8v4M14 8v3M18 8v4',
