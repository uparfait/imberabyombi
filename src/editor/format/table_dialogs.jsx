/* editor/format/table_dialogs.jsx: the "Insert table" dialog (size, width, position and a style preset) with the preset
   thumbnails, and the "Insert rows or columns" dialog. Template modal(); the result applies on submit. */
import { useState } from 'react';
import { modal } from '../../overlays/index.js';
import { clamp, editable_of, caret_to_start, body_index, toast, end_op } from '../core/index.js';
import { can_edit } from './commands.js';
import { insert_block_at_caret } from './insert.js';
import { HDR_BG, STRIPE_BG, TABLE_PRESETS, build_table } from './table_model.js';
import { table_ctx, tbl_op } from './table_ops.js';
