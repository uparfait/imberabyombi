/* editor/chrome/toolbar.jsx: the formatting toolbar (source #toolbar). Buttons carry data-ed (run by the editor's own click
   listener, not the template's data-act), data-state (refresh_toolbar marks the active ones), data-tip (template tooltip) and
   tb_edit (greyed out while viewing). The engine updates the labels (#zoom_label, #style_label, #font_label, #mode_label),
   #size_input, #color_bar and the icon slots #align_icon, #mode_icon, #menus_icon. */
import { ic } from '../../icons/index.js';
