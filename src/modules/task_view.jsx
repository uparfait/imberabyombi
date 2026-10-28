/* modules/task_view.jsx: One task, laid out like the details table (sections: Details, Assignment, Dates, Status) + comments.
   A pen on a row (on hover) turns it into an editor with Save / Cancel. Status: pick one, then Save (Done is completed now)
   or Cancel. <Task_view/> reads the task on every draw and holds what is open (editors, status buttons, preview) as state. */
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { db, rerender } from '../store/index.js';
import { qs } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { notify } from '../feedback/index.js';
