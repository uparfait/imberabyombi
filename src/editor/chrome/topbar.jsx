/* editor/chrome/topbar.jsx: the title + menu bar with a Back button (source #topbar). Open at first; the toolbar's chevron
   (#menus_toggle) toggles .show on #topbar, which opens / closes it smoothly. Menu buttons carry data-menu (the editor opens
   that menu); the top buttons are wired by id. */
import { ic, i3 } from '../../icons/index.js';

const MENUBAR = [['file', 'File'], ['edit', 'Edit'], ['view', 'View'], ['insert', 'Insert'], ['format', 'Format'], ['tools', 'Tools'], ['help', 'Help']];

export const topbar = () => (
  <header id="topbar" className="no_print show">
    <div className="topbar_in"><div className="topbar_row">
      <button type="button" className="icon_btn" data-act="back" data-tip="Back" aria-label="Back">{ic('arrow_back')}</button>
      <span className="doc_logo" aria-hidden="true">{i3('file', 'h-10 w-10')}</span>
      <div className="topbar_main">
        <input id="doc_title" className="title_input" defaultValue="Untitled document" spellCheck={false} aria-label="Document title" />
