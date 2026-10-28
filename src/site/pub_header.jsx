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
