/* behaviors/install.js: installs every document/window listener once (boot calls it): the delegated
   listeners serve the whole app, React or not, through data-act / data-form / data-* hooks in the markup. */
import { install_click } from './click_events.js';
import { install_links } from './link_clicks.js';
