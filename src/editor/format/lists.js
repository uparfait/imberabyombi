/* editor/format/lists.js: bulleted / numbered lists, list marker types and checklists (ul.checklist; data-strike
   crosses out ticked items). */
import { el_of, restore_focus, last_range, set_last_range, begin_op, end_op } from '../core/index.js';
import { can_edit, exec } from './commands.js';

/* ================= lists ================= */
/* the list (ul / ol) holding the caret, or null */
export function closest_list() { const n = last_range && el_of(last_range.startContainer); const li = n && n.closest('li'); return li ? li.parentElement : null; }
const take_sel = () => { const s = getSelection(); if (s.rangeCount) set_last_range(s.getRangeAt(0).cloneRange()); };
/* tag: 'UL' | 'OL' */
export function toggle_list(tag) {
  if (!can_edit()) return;
  restore_focus(); const l = closest_list();
  if (tag === 'UL' && l && l.classList.contains('checklist')) { begin_op(); l.classList.remove('checklist'); l.removeAttribute('data-strike'); end_op(); return; }
  exec(tag === 'UL' ? 'insertUnorderedList' : 'insertOrderedList');
}
/* type: a list-style-type value ('disc', 'lower-roman', "'★  '", …); makes the list first when needed */
export function set_list_type(tag, type) {
  if (!can_edit()) return;
  restore_focus(); let l = closest_list();
  if (!l || l.tagName !== tag || l.classList.contains('checklist')) {
