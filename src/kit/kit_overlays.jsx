/* kit/kit_overlays.jsx: the "Disclosure & overlays" specimen: details, inline messages (shown in #demo_messages, which
   React renders empty on purpose), the top loader, a dialog, a popover menu and a still notification. */
import { lorem } from '../lib/index.js';
import { ic } from '../icons/index.js';

const FEEDBACK_HELP = 'Inline messages appear instantly on the component that caused them. Bottom-right notifications confirm background actions '
  + 'on staff pages only; public and account pages show the same message inline. Loading always shows the same spinner: inside a busy button, '
  + 'inside a loading table, or in the round loader at the top for other requests.';
