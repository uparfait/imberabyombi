/* kit/kit_overlays.jsx: the "Disclosure & overlays" specimen: details, inline messages (shown in #demo_messages, which
   React renders empty on purpose), the top loader, a dialog, a popover menu and a still notification. */
import { lorem } from '../lib/index.js';
import { ic } from '../icons/index.js';

const FEEDBACK_HELP = 'Inline messages appear instantly on the component that caused them. Bottom-right notifications confirm background actions '
  + 'on staff pages only; public and account pages show the same message inline. Loading always shows the same spinner: inside a busy button, '
  + 'inside a loading table, or in the round loader at the top for other requests.';
const TONE_WORD = { ok: 'success', bad: 'error', warn: 'warning', info: 'info' };
const POP_VIEWS = [['Day', 'D'], ['Week', 'W'], ['Month', 'M'], ['Year', 'Y'], ['Schedule', 'A']];

/* the menu starts closed on every draw, as the reference's fresh markup did (a new ref function, so React calls it each time) */
const closed_pop = () => el => { if (!el) return; el.hidden = true; el._out?.cancel?.(); el._out = null; };

const toast_demo = (
  <div className="mt-6 max-w-sm"><p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Notification · staff pages only</p>
