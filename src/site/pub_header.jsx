/* site/pub_header.jsx: the public header (logo, section links, theme switch, sign in, contact, menu button) and the
   mobile drawer's content. The "drawer" action shows it: show_in_dialog('drawer', drawer_content). */
import { ic } from '../icons/index.js';
import { logo, theme_btn } from '../ui/index.js';
import { route } from '../store/index.js';
import { PUB } from './site_bits.jsx';

export function pub_header() {
  const cur = route.path.slice(1);
  return (
    <header id="site_header" className="hdr sticky top-0 z-40 bg-bg">
      <nav className="wrap flex h-16 items-center gap-4 sm:h-20" aria-label="Primary">{logo()}
        <ul className="link_group ml-auto hidden xl:flex">{PUB.slice(0, 6).map(([k, l]) => (
          <li key={k}><a href={`#/${k}`} data-sec={k} className={`nav_link ${cur === k ? 'active' : ''}`} aria-current={cur === k ? 'page' : undefined}>{l}</a></li>
        ))}</ul>
        <div className="ml-auto flex items-center gap-1 xl:ml-2">{theme_btn()}
          <a href="#/login" className="btn btn_ghost hidden sm:inline-flex">Sign in</a>
          <a href="#/contact" data-sec="contact" className="btn btn_ink hidden sm:inline-flex">Contact us</a>
          <button className="icon_btn xl:hidden" data-act="drawer" aria-label="Open menu">{ic('menu')}</button></div>
      </nav></header>
  );
}

/* Mobile menu (the #drawer dialog): Home + every public page, then Sign in and the design system */
export const drawer_content = () => (
  <div className="flex h-full flex-col p-5"><div className="flex items-center justify-between">{logo()}
    <button className="icon_btn" data-act="close_drawer" aria-label="Close menu">{ic('x')}</button></div>
    <nav className="mt-8 min-h-0 flex-1 overflow-y-auto" aria-label="Mobile"><ul className="grid gap-1">{[['', 'Home'], ...PUB].map(([k, l]) => (
