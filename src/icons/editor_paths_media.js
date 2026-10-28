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
