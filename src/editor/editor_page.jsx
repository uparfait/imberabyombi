/* editor/editor_page.jsx: Editor_page, the Document editor (admin module /admin/docs). React draws the source's page once
   (title + menu bar, toolbar, rulers, #pages, sidebar, comments panel, find panel, link bubble, hidden file inputs) and never
   redraws it (memo, no props, no state), so the engine owns everything it fills or toggles. On mount editor_start(root)
   wires the engine (refs are looked up inside #editor); on unmount its stop() saves and removes every listener.
   The page fills the admin content area (styles/editor/01_layout.css) and scrolls inside itself. */
import { memo, useEffect, useRef } from 'react';
import { editor_start } from './core/index.js';
