/* kit/kit.jsx: the design-system page (#/ui). Every specimen group lives in its own file; kit() lays them out in the
   reference's order under the page hero, with a sticky side navigation. The lorem seed is fixed (99), so the sample
   text is the same on every visit; the canvas chart is drawn once the page is on screen. */
import { lorem, qs, rgb2hex, css_var } from '../lib/index.js';
import { after_render } from '../store/index.js';
import { draw_chart } from '../charts/index.js';
import { page_hero } from '../site/index.js';
import { kit_block } from './kit_block.jsx';
import { kit_tokens } from './kit_tokens.jsx';
import { kit_type } from './kit_type.jsx';
import { kit_lists } from './kit_lists.jsx';
import { kit_actions } from './kit_actions.jsx';
import { kit_forms } from './kit_forms.jsx';
import { kit_media } from './kit_media.jsx';
import { kit_tables } from './kit_tables.jsx';
import { kit_overlays } from './kit_overlays.jsx';
import { kit_nav } from './kit_nav.jsx';
import { kit_web_component } from './kit_web_component.jsx';
import { kit_icons } from './kit_icons.jsx';

/* side navigation: [section id, title] */
const SECS = [['tokens', 'Tokens'], ['type', 'Typography'], ['lists', 'Lists'], ['actions', 'Actions'], ['forms', 'Forms'], ['media', 'Media'], ['data', 'Tables'],
  ['overlays', 'Disclosure & overlays'], ['nav', 'Nested navigation'], ['wc', 'Web component'], ['icons', '3D icons']];
const LEAD = 'Every element below is styled by the tokens at the top of the stylesheet. Change one token and the whole system follows.';

export function kit() {
  lorem.seed(99);
  const brand_hex = rgb2hex(css_var('--brand') || '224 102 27');
  after_render(() => draw_chart(qs('#chart_demo'), ['I', 'II', 'III', 'IV', 'V', 'VI'], [12, 19, 9, 24, 17, 28]));
  return (
    <>
      {page_hero('Design system', 'Lorem design system', LEAD, 'layers')}
      <div className="wrap grid gap-10 py-14 lg:grid-cols-[13rem_minmax(0,1fr)]">
