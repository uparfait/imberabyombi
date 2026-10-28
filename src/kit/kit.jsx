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
