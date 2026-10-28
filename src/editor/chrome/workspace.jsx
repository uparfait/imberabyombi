/* editor/chrome/workspace.jsx: the workspace (source #workspace): the rulers, the scroller with #pages, the sidebar
   (document tabs + outline, pages) and the comments panel. The engine fills everything rendered empty here: #pages,
   #hruler, #vruler, #tab_list, #page_list, #page_count, #comment_list; it toggles .closed / .show on the panels.
   #sidebar resolves inside the editor root (refs.sidebar): the admin shell has its own #sidebar. */
import { ic } from '../../icons/index.js';
import { find_panel } from './floating.jsx';

const icon_btn = (id, icon, tip, cls = 'icon_btn') => (
  <button type="button" id={id} className={cls} data-tip={tip} aria-label={tip}>{ic(icon)}</button>
);

export const workspace = () => (
  <div id="workspace">
    <div id="vruler" className="no_print" aria-hidden="true"></div>
    <div id="main_col">
      <div id="hruler" className="no_print" aria-hidden="true"></div>
      <div id="scroller"><div id="pages" className="doc_pages"></div></div>

      <aside id="sidebar" className="doc_side no_print" aria-label="Document tabs and outline">
