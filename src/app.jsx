/* app.jsx: the root component. It redraws whenever the store says so (render / rerender in store/app_state.js),
   draws the page for the current route (the address), and mounts the shared dialogs (modal, confirm, drawer, file viewer).
   After every draw, run_after_render() does what the page needs once it is on screen (charts, reveal animations,
   messages that follow a navigation, scrolling), including the progressive enhancers in enhance(). */
import { useLayoutEffect, useSyncExternalStore } from 'react';
import { subscribe, get_version, render_flags, route } from './store/index.js';
import { render_route, run_after_render, is_public } from './router/index.js';
import { Dialog_hosts } from './overlays/index.js';
import { spinner } from './feedback/index.js';

/* html.staff_page: admin pages draw a little larger on laptops and desktops (--scale_staff in src/styles/base);
   html.public_page: the public website lets text be selected; html.stage_page: Open This Event, one view scaled to fit;
const mark_page = () => {
  const c = document.documentElement.classList, p = route.path || '';
  c.toggle('staff_page', /^\/admin(\/|$)/.test(p)); c.toggle('public_page', is_public(p)); c.toggle('stage_page', /^\/admin\/(events|calendar)\/[^/]+\/live$/.test(p));
};

/* the same spinner index.html shows while the app loads, kept until the first page is drawn */
const boot_loader = <div className="boot_loader" role="status" aria-label="Loading">{spinner()}</div>;

export default function App() {
  const version = useSyncExternalStore(subscribe, get_version);
  const page = render_route();
  useLayoutEffect(() => { mark_page(); run_after_render({ ...render_flags }); }, [version]);
  return (
    <>
      {page ?? (version === 0 && boot_loader)}
      <Dialog_hosts />
    </>
  );
}
