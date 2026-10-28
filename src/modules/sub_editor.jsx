/* modules/sub_editor.jsx: the subtasks editor (task form and task view): a subtask = a title + items, each added and removed
   in place. <Sub_editor/> holds the list as state; its fields stay uncontrolled and read_subs() reads them back. The
   data-act handlers (sub_act.js) reach that state through sub_api(), and an element's state key through sub_key(). */
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { ic } from '../icons/index.js';

const API = new WeakMap(), KEYS = new WeakMap();
