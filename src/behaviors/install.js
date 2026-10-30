/* behaviors/install.js: installs every document/window listener once (boot calls it): the delegated
   listeners serve the whole app, React or not, through data-act / data-form / data-* hooks in the markup. */
import { install_click } from './click_events.js';
import { install_links } from './link_clicks.js';
import { install_input } from './input_events.js';
import { install_change } from './change_events.js';
import { install_keys } from './key_events.js';
import { install_pointer } from './pointer_events.js';
import { install_page } from './page_events.js';
import { install_scroll } from './scrolling.js';

let installed = false;
export function install_listeners() {
  if (installed) return; installed = true;
