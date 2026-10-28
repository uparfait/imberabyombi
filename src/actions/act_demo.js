/* actions/act_demo.jsx: data-act handlers of the media player's play button and the design system's demos (dialog,
   inline messages, the top loader, a busy button). #demo_messages is rendered empty on purpose: messages fill it. */
import { qs, lorem } from '../lib/index.js';
import { field } from '../fields/index.js';
import { field_spec } from '../schemas/index.js';
import { show_msg, form_msg, request } from '../feedback/index.js';
import { modal } from '../overlays/index.js';
import { media_err } from './media.js';

const TITLES = { ok: 'Saved', bad: 'Could not save', warn: 'Check this first', info: 'Good to know' };

export const DEMO_ACT = {
  mp_play: t => { const w = t.closest('[data-mp]'), m = w?._m; if (m) m.paused ? m.play().catch(() => media_err(w)) : m.pause(); },
  demo_dialog: () => modal({ title: lorem.t(3), help: lorem.p(2), submit: 'Confirm', body: field(field_spec('demo', 'Lorem field', 'text', 0, 1), ''), on_submit: () => show_msg(qs('#demo_messages'), 'ok', 'Confirmed', 'Lorem ipsum dolor sit amet.') }),
  demo_save: t => form_msg(t.closest('form'), 'ok', 'Saved', 'Lorem ipsum dolor sit amet, consectetur.'),
  demo_msg: t => show_msg(qs('#demo_messages'), t.dataset.v, TITLES[t.dataset.v], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false),
  demo_bar: () => request(() => show_msg(qs('#demo_messages'), 'info', 'Request finished', 'The loader ran for one simulated request.'), { delay: 1200 }),
