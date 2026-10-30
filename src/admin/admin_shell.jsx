/* admin_shell.jsx: the admin shell (top bar, sidebar, side rail, panels): the admin page around a module view.
   The switches ACT.side flips in place (sidebar open / scrim) are set again from ui after every draw, so a redraw
   always shows the stored state; #main is new on every new page, so its enter animation plays again. */
import { ic, mark3d } from '../icons/index.js';
import { ui, render_flags, get_version } from '../store/index.js';
import { MODS } from '../auth/index.js';
import { sidebar } from './sidebar.jsx';
import { header_tools, RAIL } from './header_tools.jsx';
import { panel_html } from './panel_html.jsx';
import { Live_slot, sync_ref } from './live_slot.jsx';

const panel_now = () => ui.panel ? panel_html(ui.panel) : null;
const desk_min = () => ui.side_min && innerWidth >= 1024;
const side_sync = el => { el.dataset.open = ui.side; el.dataset.min = ui.side_min; el.inert = desk_min(); };
const scrim_sync = el => { el.classList.toggle('on', ui.side); };

/* a new key for #main on a new page, or on a redraw that keeps the page-enter motion (render(true, true)) */
let page_n = 0, seen = -1;
const page_key = () => { const v = get_version(); if (v !== seen) { seen = v; if (!render_flags.keep || render_flags.anim) page_n++; } return 'page' + page_n; };

export function admin_shell(mod, content) {
  const m = MODS.find(x => x.k === mod);
  /* Layout (Imberabyombi style): full-height sidebar on the left; header + content + side panels on the right.
     Header left: phones = menu icon + logo; desktop with the sidebar closed = logo that turns into "open sidebar" on hover. */
  return <div className="flex min-h-[100dvh]">
  <div id="sidebar_scrim" ref={sync_ref(scrim_sync)} className={`scrim fixed inset-0 z-40 bg-ink/50 lg:hidden ${ui.side ? 'on' : ''}`}
    data-act="side" aria-hidden="true"></div>
  <aside id="sidebar" ref={sync_ref(side_sync)}
    className="side fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 -translate-x-full flex-col border-r border-line bg-bg lg:sticky lg:top-0 lg:bottom-auto lg:z-0 lg:h-[100dvh] lg:translate-x-0 lg:border-0"
    data-open={String(ui.side)} data-min={String(ui.side_min)} inert={desk_min()} aria-label="Sidebar">{sidebar(mod)}</aside>
  <div className="flex min-w-0 flex-1 flex-col">
  <header id="app_header" className="hdr sticky top-0 z-40 flex h-16 items-center gap-1 bg-bg px-2 sm:gap-2 sm:px-4">
    <button className="icon_btn lg:hidden" data-act="side" aria-label="Open menu">{ic('menu')}</button>
    <button className="brand_toggle" data-act="side" aria-label="Open sidebar" data-tip="Open sidebar">
      <span className="bt_logo">{mark3d('#', 'h-9 w-9')}</span><span className="bt_open">{ic('sideOpen')}</span></button>
    <h1 className="sr-only">{m?.l || 'Not found'}</h1>
    <div className="link_group ml-auto flex sm:gap-1">
      {header_tools()}
    </div></header>
  <div className="flex flex-1">
