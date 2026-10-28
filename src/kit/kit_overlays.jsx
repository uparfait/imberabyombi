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
    <div className="toast toast_still" data-tone="ok"><span data-ico="">{ic('check', 'h-4 w-4')}</span>
      <div><p data-title="">Saved</p><p data-msg="">Lorem ipsum dolor sit amet, consectetur.</p></div>
      <span className="grid h-[1.9rem] w-[1.9rem] place-items-center text-muted" aria-hidden="true">{ic('x', 'h-4 w-4')}</span>
      <span className="bar" aria-hidden="true"></span></div></div>
);

export const kit_overlays = () => (
  <>
    <div className="grid max-w-2xl gap-3">{[0, 1].map(i => (
      <details key={i} open={!i}><summary>{lorem.t(4)}?</summary><p className="px-5 pb-5 pt-3 text-muted">{lorem.p(2)}</p></details>
    ))}</div>
    <h3 className="mt-10 text-xl">Feedback</h3><p className="mt-1 max-w-prose text-sm text-muted">{FEEDBACK_HELP}</p>
    <div className="mt-4 flex flex-wrap gap-2">{['ok', 'bad', 'warn', 'info'].map(v => (
      <button key={v} className="btn btn_outline btn_sm" data-act="demo_msg" data-v={v}>{`Inline ${TONE_WORD[v]}`}</button>
    ))}<button className="btn btn_outline btn_sm" data-act="demo_bar">Run loader</button></div>
    <div id="demo_messages" className="mt-4 max-w-2xl empty:hidden"></div>
