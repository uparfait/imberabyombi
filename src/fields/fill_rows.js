/* fields/fill_rows.js: in a two-column form grid marked [data-fill-rows], a field left alone on its row fills the row
   (.fill_row): the last of an odd run before a full-width item (sm:col-span-2) or the end. Only what shows counts, so a
   field hidden for a status (sync_when) lets the next one take its place. The modal form runs it on every draw, pages
