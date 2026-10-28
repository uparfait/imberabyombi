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
  return (<>
    <input type="hidden" name="preset" value={preset} />
    <div className="preset_grid">{TABLE_PRESETS.map(p => (
      <button key={p.key} type="button" className="preset" aria-pressed={String(p.key === preset)} onClick={() => set_preset(p.key)}>
        {preset_preview(p)}<div className="preset_lbl">{p.label}</div>
      </button>))}</div>
  </>);
}
export function custom_table_dialog() {
  if (previewing() || !can_edit()) return;
  modal({
    title: 'Insert table', submit: 'Insert table',
    body: <>
      {num_field('ct_c', 'Columns', { min: 1, max: 30, defaultValue: 3 })}
      {num_field('ct_r', 'Rows', { min: 1, max: 500, defaultValue: 4 })}
      {num_field('ct_w', 'Width (% of the line)', { min: 10, max: 100, defaultValue: 100 })}
      {sel_field('ct_a', 'Position', POSITIONS, 'left')}
      <div className="sm:col-span-2"><p className="mb-2 text-sm font-medium">Style</p><Preset_grid start="header" /></div>
    </>,
    on_submit: v => {
      const C = clamp(parseInt(v.ct_c) || 3, 1, 30), R = clamp(parseInt(v.ct_r) || 1, 1, 500), W = clamp(parseInt(v.ct_w) || 100, 10, 100), A = v.ct_a, preset = v.preset;
      const t = build_table(R, C, { preset, width: W });
