/* editor/ui/menu_items.jsx: the item lists the menus and the toolbar dropdowns share (source "menu definitions"):
   alignment, line & paragraph spacing, bullet and number styles, text formats, paragraph styles, download formats and
   zoom steps. Formatting items preview on hover (menu engine); downloads carry no_preview; zoom previews the view. */
import { state, refs, clamp, STYLES, ZOOMS } from '../core/index.js';
import { exec, set_line_height, toggle_para_space, set_list_type, bump_size, transform_case, set_block_style, selected_blocks } from '../format/index.js';
import { FORMATS, open_download_dialog } from '../io_export/index.js';
import { modal } from '../../overlays/index.js';
import { set_zoom, zoom_fit } from './view.js';
import { after_close } from './dialogs.jsx';

export function align_items() {
  return [['left', 'format_align_left', 'justifyLeft', 'Ctrl+Shift+L'], ['center', 'format_align_center', 'justifyCenter', 'Ctrl+Shift+E'],
    ['right', 'format_align_right', 'justifyRight', 'Ctrl+Shift+R'], ['justify', 'format_align_justify', 'justifyFull', 'Ctrl+Shift+J']]
    .map(([l, i, c, k]) => ({ label: l[0].toUpperCase() + l.slice(1), icon: i, shortcut: k, action: () => exec(c) }));
}
function custom_spacing_dialog() {
  modal({
    title: 'Custom spacing', submit: 'Apply',
    body: <div className="field sm:col-span-2"><label htmlFor="cs_line">Line spacing</label>
      <input id="cs_line" name="cs_line" type="number" placeholder=" " min="0.5" max="5" step="0.05" defaultValue="1.15" /></div>,
    on_submit: v => { const x = String(clamp(parseFloat(v.cs_line) || 1.15, 0.5, 5)); after_close(() => set_line_height(x)); }
  });
}
export function spacing_items() {
  const line = () => { const b = selected_blocks()[0]; return b ? b.style.lineHeight || '1.15' : ''; };
  return [
    ...[['Single', '1'], ['1.15', '1.15'], ['1.5', '1.5'], ['Double', '2']].map(([l, v]) => ({ label: l, checked: line() === v, action: () => set_line_height(v) })),
    { sep: true },
    { label: 'Add / remove space before paragraph', action: () => toggle_para_space('before') },
    { label: 'Add / remove space after paragraph', action: () => toggle_para_space('after') },
    { label: 'Custom spacing…', no_preview: true, action: custom_spacing_dialog }
  ];
}
export function bullet_items() {
  return [['Disc', 'disc', '●'], ['Circle', 'circle', '○'], ['Square', 'square', '■'], ['Arrow', "'➔  '", '➔'], ['Star', "'★  '", '★'], ['Dash', "'–  '", '–']]
    .map(([l, v, g]) => ({ label: `${g}   ${l}`, action: () => set_list_type('UL', v) }));
}
export function number_items() {
  return [['1. 2. 3.', 'decimal'], ['01. 02. 03.', 'decimal-leading-zero'], ['a. b. c.', 'lower-alpha'], ['A. B. C.', 'upper-alpha'],
    ['i. ii. iii.', 'lower-roman'], ['I. II. III.', 'upper-roman']].map(([l, v]) => ({ label: l, action: () => set_list_type('OL', v) }));
}
export function text_items() {
  return [
    { label: 'Bold', icon: 'format_bold', shortcut: 'Ctrl+B', action: () => exec('bold') },
    { label: 'Italic', icon: 'format_italic', shortcut: 'Ctrl+I', action: () => exec('italic') },
    { label: 'Underline', icon: 'format_underlined', shortcut: 'Ctrl+U', action: () => exec('underline') },
    { label: 'Strikethrough', icon: 'strikethrough_s', shortcut: 'Ctrl+Shift+X', action: () => exec('strikeThrough') },
