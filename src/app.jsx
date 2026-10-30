/* app.jsx: the root component. It redraws whenever the store says so (render / rerender in store/app_state.js),
   draws the page for the current route (the address), and mounts the shared dialogs (modal, confirm, drawer, file viewer).
   After every draw, run_after_render() does what the page needs once it is on screen (charts, reveal animations,
   messages that follow a navigation, scrolling), including the progressive enhancers in enhance(). */
