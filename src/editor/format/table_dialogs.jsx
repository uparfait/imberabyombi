/* editor/format/table_dialogs.jsx: the "Insert table" dialog (size, width, position and a style preset) with the preset
   thumbnails, and the "Insert rows or columns" dialog. Template modal(); the result applies on submit. */
import { useState } from 'react';
import { modal } from '../../overlays/index.js';
import { clamp, editable_of, caret_to_start, body_index, toast, end_op } from '../core/index.js';
import { can_edit } from './commands.js';
import { insert_block_at_caret } from './insert.js';
import { HDR_BG, STRIPE_BG, TABLE_PRESETS, build_table } from './table_model.js';
import { table_ctx, tbl_op } from './table_ops.js';
import { num_field, sel_field, POSITIONS } from './dialog_fields.jsx';
import { refocus_after_close, previewing } from './guards.js';

/* a 3 × 4 thumbnail of preset p (drawn as on the white page) */
export function preset_preview(p) {
  const line = p.bw ? `1px solid ${p.bc}` : '1px dashed #dadce0';
  const side = p.style === 'minimal' ? { borderLeftColor: 'transparent', borderRightColor: 'transparent' } : {};
  return (
    <table><tbody>{[0, 1, 2, 3].map(r => <tr key={r}>{[0, 1, 2].map(k => {
      const bg = r === 0 && p.header ? HDR_BG : (p.striped && (r - (p.header ? 1 : 0)) % 2 === 1) ? STRIPE_BG : '#fff';
      return <td key={k} style={{ border: line, ...side, background: bg }}></td>;
    })}</tr>)}</tbody></table>
  );
}
/* the preset buttons (one pressed); the choice is submitted as "preset" */
function Preset_grid({ start }) {
  const [preset, set_preset] = useState(start);
