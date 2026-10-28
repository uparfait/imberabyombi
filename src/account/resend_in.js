/* account/resend_in.js: the resend countdown on the verification page ("Resend in 30s", then "Resend code").
   The interval goes into TIMERS, so it stops before the next render. It changes only the button's text and disabled
   state: React renders that text as the button's only child, so writing textContent there is safe. */
import { qs } from '../lib/index.js';
import { TIMERS } from '../store/index.js';
