/* editor/chrome/toolbar.jsx: the formatting toolbar (source #toolbar). Buttons carry data-ed (run by the editor's own click
   listener, not the template's data-act), data-state (refresh_toolbar marks the active ones), data-tip (template tooltip) and
   tb_edit (greyed out while viewing). The engine updates the labels (#zoom_label, #style_label, #font_label, #mode_label),
   #size_input, #color_bar and the icon slots #align_icon, #mode_icon, #menus_icon. */
import { ic } from '../../icons/index.js';

const name_of = tip => tip.replace(/ \(.+\)$/, '');
/* an icon button: ed = data-ed action, edit = only while editing (tb_edit), state = data-state, id for the menu buttons */
const tb = ({ ed, icon, tip, edit = true, state, id }) => (
  <button type="button" id={id} className={edit ? 'tb_btn tb_edit' : 'tb_btn'} data-ed={ed} data-state={state} data-tip={tip}
    aria-label={name_of(tip)}>{ic(icon)}</button>
);
/* a drop-down with a text label (zoom, styles, font) */
const dd = (id, label_id, label, tip, width, edit) => (
  <button type="button" id={id} className={edit ? 'tb_dd tb_edit' : 'tb_dd'} style={{ width }} data-tip={tip} aria-haspopup="menu">
    <span className="lbl" id={label_id}>{label}</span>{ic('arrow_drop_down')}</button>
);
/* a list button with its own small menu arrow */
const split = (ed, icon, tip, dd_id, dd_tip) => (
  <span className="tb_split tb_edit">
    <button type="button" className="tb_btn" data-ed={ed} data-state={ed} data-tip={tip} aria-label={name_of(tip)}>{ic(icon)}</button>
    <button type="button" className="tb_btn arrow" id={dd_id} data-tip={dd_tip} aria-label={dd_tip} aria-haspopup="menu">{ic('arrow_drop_down')}</button>
  </span>
);
const sep = () => <div className="tb_sep"></div>;

export const toolbar = () => (
  <div id="toolbar" className="toolbar no_print" role="toolbar" aria-label="Formatting">
    <button type="button" className="tb_btn tb_back" data-act="back" data-tip="Back" aria-label="Back">{ic('chev_l')}</button>
    {tb({ ed: 'find', icon: 'search', tip: 'Find and replace (Ctrl+F)', edit: false })}
    {tb({ ed: 'undo', icon: 'undo', tip: 'Undo (Ctrl+Z)' })}
    {tb({ ed: 'redo', icon: 'redo', tip: 'Redo (Ctrl+Y)' })}
    {tb({ ed: 'print', icon: 'print', tip: 'Print (Ctrl+P)', edit: false })}
    {tb({ ed: 'upload', icon: 'upload_file', tip: 'Upload files (Ctrl+O)', edit: false })}
    {tb({ ed: 'download', icon: 'download', tip: 'Download', edit: false })}
    {tb({ ed: 'spell', icon: 'spellcheck', tip: 'Spelling check on/off', edit: false, id: 'spell_btn' })}
    {tb({ ed: 'paint', icon: 'format_paint', tip: 'Paint format', id: 'paint_btn' })}
    {dd('zoom_btn', 'zoom_label', '100%', 'Zoom', '4.5rem', false)}
    {sep()}
    {dd('style_btn', 'style_label', 'Normal text', 'Styles', '7.5rem', true)}
    {sep()}
    {dd('font_btn', 'font_label', 'Arial', 'Font', '6.75rem', true)}
    {sep()}
    {tb({ ed: 'size_down', icon: 'remove', tip: 'Decrease font size (Ctrl+Shift+,)' })}
    <input id="size_input" className="size_box tb_edit" defaultValue="11" inputMode="decimal" aria-label="Font size" data-tip="Font size" />
    {tb({ ed: 'size_up', icon: 'add', tip: 'Increase font size (Ctrl+Shift+.)' })}
    {sep()}
    {tb({ ed: 'bold', icon: 'format_bold', tip: 'Bold (Ctrl+B)', state: 'bold' })}
    {tb({ ed: 'italic', icon: 'format_italic', tip: 'Italic (Ctrl+I)', state: 'italic' })}
    {tb({ ed: 'underline', icon: 'format_underlined', tip: 'Underline (Ctrl+U)', state: 'underline' })}
    <button type="button" className="tb_btn tb_edit" id="color_btn" data-tip="Text color" aria-label="Text color" aria-haspopup="menu">
      <span className="color_a"><span className="a">A</span><span className="bar" id="color_bar" style={{ background: '#000' }}></span></span></button>
    {tb({ icon: 'ink_highlighter', tip: 'Highlight color', id: 'hilite_btn' })}
    {sep()}
    {tb({ ed: 'link', icon: 'link', tip: 'Insert link (Ctrl+K)' })}
    {tb({ ed: 'comment', icon: 'add_comment', tip: 'Add comment (Ctrl+Alt+M)' })}
    {tb({ icon: 'image', tip: 'Insert image', id: 'image_btn' })}
    {sep()}
    <button type="button" className="tb_btn tb_edit" id="align_btn" data-tip="Align & indent" aria-label="Align & indent" aria-haspopup="menu">
      <span className="ic_slot" id="align_icon">{ic('format_align_left')}</span>{ic('arrow_drop_down', 'dd_arrow')}</button>
    {tb({ icon: 'format_line_spacing', tip: 'Line & paragraph spacing', id: 'spacing_btn' })}
    {split('checklist', 'checklist', 'Checklist (Ctrl+Shift+9)', 'check_dd', 'Checklist menu')}
    {split('bullets', 'format_list_bulleted', 'Bulleted list (Ctrl+Shift+8)', 'bullet_dd', 'Bullet styles')}
    {split('numbers', 'format_list_numbered', 'Numbered list (Ctrl+Shift+7)', 'number_dd', 'Numbering styles')}
    {tb({ ed: 'outdent', icon: 'format_indent_decrease', tip: 'Decrease indent (Ctrl+[)' })}
    {tb({ ed: 'indent', icon: 'format_indent_increase', tip: 'Increase indent (Ctrl+])' })}
    {tb({ ed: 'clear', icon: 'format_clear', tip: 'Clear formatting (Ctrl+\\)' })}
    <div className="tb_fill"></div>
    <button type="button" className="tb_dd mode_btn" id="mode_btn" data-tip="Editing mode" aria-haspopup="menu">
      <span className="ic_slot" id="mode_icon">{ic('edit')}</span><span className="lbl hidden md:inline" id="mode_label">Editing</span>{ic('arrow_drop_down')}</button>
    {sep()}
    <button type="button" className="tb_btn" id="menus_toggle" data-tip="Hide menus (Ctrl+Shift+F)" aria-label="Show or hide the menus">
      <span className="ic_slot" id="menus_icon">{ic('expand_less')}</span></button>
  </div>
);
