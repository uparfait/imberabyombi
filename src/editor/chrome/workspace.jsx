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
      <div id="hruler" className="no_print"></div>
      <div id="scroller"><div id="pages" className="doc_pages"></div></div>

      <aside id="sidebar" className="doc_side no_print" aria-label="Document tabs and outline">
        <div className="side_head">{icon_btn('sidebar_close', 'arrow_back', 'Hide tabs & outlines')}</div>
        <div className="side_row">
          <span className="side_title">Document tabs</span>{icon_btn('add_tab_btn', 'add', 'Add tab', 'icon_btn sm')}
        </div>
        <div id="tab_list"></div>
        <div className="side_row side_gap">
          <span className="side_title">Pages <span id="page_count" className="side_count"></span></span>
          {icon_btn('add_page_btn', 'note_add', 'Add blank page after current page', 'icon_btn sm')}
        </div>
        <div id="page_list"></div>
      </aside>
      {icon_btn('sidebar_open', 'toc', 'Show tabs & outlines', 'icon_btn no_print')}

      <aside id="comments_panel" className="no_print" aria-label="Comments">
        <div className="side_head side_between">
          <span className="side_title">Comments</span>{icon_btn('comments_close', 'close', 'Close comments')}
        </div>
        <div id="comment_list"></div>
      </aside>
    </div>
    {find_panel()}
  </div>
);
