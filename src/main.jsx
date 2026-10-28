/* main.jsx: the entry point. Loads the stylesheet in the reference's order (base + components + Tailwind, then the
   rules that come after the utilities), prepares the page (design tokens, top layer, saved switches), mounts the

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
