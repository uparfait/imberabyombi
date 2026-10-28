/* site/pages.jsx: the home page (every section in order) and the detail pages: config-driven, one renderer.
   A detail page = page hero (breadcrumb, title, lead, 3D icon) + its top block (PAGES[k].top) + the long text. */
import { ic, i3 } from '../icons/index.js';
import { lorem, hash_str } from '../lib/index.js';
import { sitemap } from '../emails/index.js';
import { hero_shell } from './site_bits.jsx';
import { hero_sec, about_sec } from './hero_about.jsx';
import { mission_sec, vision_sec } from './mission_vision.jsx';
import { strategies_sec, staff_sec } from './strategies_staff.jsx';
import { partners_sec, thanks_sec } from './partners_thanks.jsx';
import { contact_sec } from './contact_sec.jsx';
import { staff_dir, faq, intro_top } from './detail_blocks.jsx';
import { tiers } from './tiers.jsx';
import { longform } from './longform.jsx';

export function home() {
  lorem.seed(11);
  return <>{hero_sec()}{about_sec()}{mission_sec()}{vision_sec()}{strategies_sec()}{staff_sec()}{partners_sec()}{thanks_sec()}{contact_sec()}</>;
}

/* Add a public page: add an entry here { t: title, i: icon, top: () => JSX } (and to PUB to show it in the menus) */
export const PAGES = {
  intro: { t: 'Overview', i: 'layers', top: () => intro_top() },
  about: { t: 'About', i: 'users', top: () => about_sec(1) },
  mission: { t: 'Mission', i: 'flag', top: () => mission_sec(1) },
  vision: { t: 'Vision', i: 'eye', top: () => vision_sec(1) },
  strategies: { t: 'Strategies', i: 'compass', top: () => <>{strategies_sec(1)}{faq()}</> },
  staff: { t: 'Staff', i: 'users', top: () => staff_dir() },
  partners: { t: 'Partners', i: 'link', top: () => <>{partners_sec(1)}{tiers()}</> },
  thanks: { t: 'Thanks', i: 'heart', top: () => thanks_sec(1) },
  contact: { t: 'Contact', i: 'mail', top: () => contact_sec(1) },
  sitemap: { t: 'Site map', i: 'grid', top: () => sitemap() }
};

export const page_hero = (crumb, title, lead, icon) => (
  <section className="wrap pt-3 sm:pt-6">{hero_shell(
    <div className="relative grid items-center gap-8 px-6 pb-20 pt-10 sm:px-12 sm:pb-24 sm:pt-14 md:grid-cols-[1fr_auto]">
      <div className="hero_in"><nav aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm text-fg/60">
        <li><a href="#/" className="hover:text-fg">Home</a></li><li aria-hidden="true">{ic('chev_r', 'h-3.5 w-3.5')}</li>
