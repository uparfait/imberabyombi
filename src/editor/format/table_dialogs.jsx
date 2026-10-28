/* editor/format/table_dialogs.jsx: the "Insert table" dialog (size, width, position and a style preset) with the preset
   thumbnails, and the "Insert rows or columns" dialog. Template modal(); the result applies on submit. */
import { useState } from 'react';
import { modal } from '../../overlays/index.js';
import { clamp, editable_of, caret_to_start, body_index, toast, end_op } from '../core/index.js';
import { can_edit } from './commands.js';
