/* app.jsx: the root component. It redraws whenever the store says so (render / rerender in store/app_state.js),
   draws the page for the current hash route, and mounts the shared dialogs (modal, confirm, drawer, file viewer).
   After every draw, run_after_render() does what the page needs once it is on screen (charts, reveal animations,
   messages that follow a navigation, scrolling), like enhance() in the reference. */
import { useLayoutEffect, useSyncExternalStore } from 'react';
import { subscribe, get_version, render_flags } from './store/index.js';
import { render_route, run_after_render } from './router/index.js';
import { Dialog_hosts } from './overlays/index.js';

export default function App() {
  const version = useSyncExternalStore(subscribe, get_version);
  const page = render_route();
  useLayoutEffect(() => { run_after_render({ ...render_flags }); }, [version]);
  return (
    <>
      {page}
      <Dialog_hosts />
    </>
  );
}

export default App
