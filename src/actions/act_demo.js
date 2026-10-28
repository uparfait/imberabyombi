/* actions/act_demo.jsx: data-act handlers of the media player's play button and the design system's demos (dialog,
   inline messages, the top loader, a busy button). #demo_messages is rendered empty on purpose: messages fill it. */
import { qs, lorem } from '../lib/index.js';
import { field } from '../fields/index.js';
import { field_spec } from '../schemas/index.js';
import { show_msg, form_msg, request } from '../feedback/index.js';
import { modal } from '../overlays/index.js';
