/* editor/chrome/floating.jsx: the floating parts of the editor page: the find and replace panel (source #findPanel, shown
   with .show), the link bubble (#link_bubble, positioned and shown by the engine; #lb_url filled by it) and the hidden file
   inputs the menus click (#file_open, #image_open, #image_replace). */
import { ic } from '../../icons/index.js';

const small_btn = (id, icon, tip) => (
  <button type="button" className="icon_btn sm" id={id} data-tip={tip} aria-label={tip.replace(/ \(.+\)$/, '')}>{ic(icon)}</button>
);

export const find_panel = () => (
  <div id="find_panel" className="find_panel no_print" role="dialog" aria-label="Find and replace">
    <div className="find_line">
      <input type="text" id="find_input" placeholder="Find in document" aria-label="Find" />
      <span id="find_count" className="find_count">0 of 0</span>
      {small_btn('find_prev', 'keyboard_arrow_up', 'Previous (Shift+Enter)')}
      {small_btn('find_next', 'keyboard_arrow_down', 'Next (Enter)')}
      {small_btn('find_close', 'close', 'Close (Esc)')}
    </div>
    <div className="find_line">
      <input type="text" id="replace_input" placeholder="Replace with" aria-label="Replace with" />
    </div>
    <div className="find_line find_foot">
      <label className="find_case"><input type="checkbox" id="find_case" /> Match case</label>
      <div className="flex gap-2">
        <button type="button" className="btn btn_outline btn_sm" id="replace_one">Replace</button>
        <button type="button" className="btn btn_outline btn_sm" id="replace_all">Replace all</button>
      </div>
    </div>
  </div>
);

export const link_bubble = () => (
  <div id="link_bubble" className="no_print" role="dialog" aria-label="Link">
    {ic('public', 'lb_globe')}<a id="lb_url" target="_blank" rel="noopener"></a>
    {small_btn('lb_copy', 'content_copy', 'Copy link')}
    {small_btn('lb_edit', 'edit', 'Edit link')}
    {small_btn('lb_remove', 'link_off', 'Remove link')}
