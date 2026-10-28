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
    <button type="button" className="tb_btn tb_back" data-act="back" data-tip="Back" aria-label="Back">{ic('arrow_back')}</button>
    {tb({ ed: 'find', icon: 'search', tip: 'Find and replace (Ctrl+F)', edit: false })}
