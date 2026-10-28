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
