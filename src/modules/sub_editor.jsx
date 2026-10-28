/* modules/sub_editor.jsx: the subtasks editor (task form and task view): a subtask = a title + items, each added and removed
   in place. <Sub_editor/> holds the list as state; its fields stay uncontrolled and read_subs() reads them back. The
   data-act handlers (sub_act.js) reach that state through sub_api(), and an element's state key through sub_key(). */
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { ic } from '../icons/index.js';

const API = new WeakMap(), KEYS = new WeakMap();
let seq = 0;
const tie = k => el => { if (el) KEYS.set(el, k); };
const keyed = groups => groups.map(g => ({ t: g.t, key: ++seq, items: (g.items || []).map(x => ({ t: x.t, done: x.done, key: ++seq })) }));
export const sub_api = el => API.get(el?.closest?.('[data-subs]'));
export const sub_key = el => KEYS.get(el);

export const sub_item = (x = {}) => <div key={x.key} ref={tie(x.key)} className="sub_item" data-sub-item="">
  <input type="checkbox" className="check_circle" defaultChecked={!!x.done} aria-label="Done" />
    <input className="sub_text" defaultValue={x.t || ''} placeholder="Item" aria-label="Item" />
  <button type="button" className="icon_btn h-8 w-8 shrink-0" data-act="sub_rm" aria-label="Remove item">{ic('x', 'h-4 w-4')}</button></div>;
export const sub_group = (g = {}) => <div key={g.key} ref={tie(g.key)} className="sub_group" data-sub-group="">
