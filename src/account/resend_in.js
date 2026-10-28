/* account/resend_in.js: the resend countdown on the verification page ("Resend in 30s", then "Resend code").
   The interval goes into TIMERS, so it stops before the next render. It changes only the button's text and disabled
   state: React renders that text as the button's only child, so writing textContent there is safe. */
import { qs } from '../lib/index.js';
import { TIMERS } from '../store/index.js';

export function resend_in(n) {
  const b = qs('#otp_resend'); if (!b) return; let s = n; b.disabled = true;
  const tick = () => { if (!b.isConnected) return; b.textContent = s > 0 ? `Resend in ${s}s` : 'Resend code'; b.disabled = s > 0; s--; };
  tick(); TIMERS.push(setInterval(tick, 1000));
}
