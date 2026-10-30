/* editor/chrome/topbar.jsx: the title + menu bar with a Back button (source #topbar). Open at first; the toolbar's chevron
   (#menus_toggle) toggles .show on #topbar, which opens / closes it smoothly. Menu buttons carry data-menu (the editor opens
   that menu); the top buttons are wired by id. */
import { ic, i3 } from '../../icons/index.js';

const MENUBAR = [['file', 'File'], ['edit', 'Edit'], ['view', 'View'], ['insert', 'Insert'], ['format', 'Format'], ['tools', 'Tools'], ['help', 'Help']];

export const topbar = () => (
  <header id="topbar" className="no_print show">
    <div className="topbar_in"><div className="topbar_row">
      <button type="button" className="icon_btn" data-act="back" data-tip="Back" aria-label="Back">{ic('chev_l')}</button>
      <span className="doc_logo" aria-hidden="true">{i3('file', 'h-10 w-10', 'info')}</span>
      <div className="topbar_main">
        <input id="doc_title" className="title_input" defaultValue="Untitled document" spellCheck={false} aria-label="Document title" />
        <nav id="menubar" aria-label="Menus">
          {MENUBAR.map(([k, l]) => <button key={k} type="button" className="menubar_btn" data-menu={k}>{l}</button>)}
        </nav>
      </div>
      <div className="top_btns">
        <button type="button" id="top_upload" className="icon_btn" data-tip="Upload files" aria-label="Upload files">{ic('upload_file')}</button>
        <button type="button" id="top_comments" className="icon_btn" data-tip="Show comments" aria-label="Show comments">{ic('comment')}</button>
        <button type="button" id="top_download" className="btn btn_primary btn_sm pill_btn">{ic('download', 'h-4 w-4')}
          <span className="hidden sm:inline">Download</span><span className="sr-only sm:hidden">Download</span></button>
      </div>
    </div></div>
  </header>
);
