/* fields/fill_rows.js: in a two-column form grid marked [data-fill-rows], a field left alone on its row fills the row
   (.fill_row): the last of an odd run before a full-width item (sm:col-span-2) or the end. Only what shows counts, so a
   field hidden for a status (sync_when) lets the next one take its place. The modal form runs it on every draw, pages
   after theirs (run_after_render), sync_when when fields show or hide. */
const FULL = '.sm\\:col-span-2, .col-span-2';
export function fill_rows(grid) {
  let open = null;
  for (const el of grid.children) {
    el.classList.remove('fill_row');
