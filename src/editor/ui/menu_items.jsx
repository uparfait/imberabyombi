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
