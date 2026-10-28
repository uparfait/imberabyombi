/* modules/sub_act.js: the subtasks editor's buttons (task form and task view): add a subtask or an item (focused, faded in),
   remove one (faded out, then gone). Part of TASK_ACT. */
import { reduced } from '../feedback/index.js';
import { sub_api, sub_key } from './sub_editor.jsx';

/* fade an element out, then drop it from the editor's state (at once with reduced motion) */
const fade_out = (el, frames, ms, rm) => { if (reduced()) return rm(); el.animate(frames, { duration: ms }).finished.then(rm); };

export const SUB_ACT = {
  sub_add: t => { const list = t.previousElementSibling; sub_api(list)?.add_group(); const g = list.lastElementChild; g.querySelector('.sub_title').focus();
