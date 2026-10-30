/* feedback/top_layer.js: the top layer. An open dialog covers everything else, so #toasts and #loader are manual
   popovers (also in the top layer). A dialog opened later lands above them, so every dialog opens through
   show_dialog(), which lifts them back on top (toasts already on screen keep their place and their timer bar). */
import { qsa } from '../lib/index.js';

export function raise_top() {
  for (const el of [document.getElementById('toasts'), document.getElementById('loader')]) { if (!el?.showPopover) continue;
    const bars = qsa('.toast', el).map(n => [n, new DOMMatrix(getComputedStyle(n.querySelector('.bar')).transform).a]);
    if (el.matches(':popover-open')) el.hidePopover(); el.showPopover();
    bars.forEach(([n, s]) => { n.classList.add('raised'); n.querySelector('.bar').style.animationDelay = `-${(1 - s) * parseFloat(n.style.getPropertyValue('--life'))}ms`; }); }
}
export const show_dialog = d => { d.showModal(); raise_top(); };
/* the browser's full screen lands above them too ("Copied" would be hidden): lifted again on each change */
