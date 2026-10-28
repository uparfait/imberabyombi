/* overlays/modal_form.jsx: <Modal_form/>, the form modal() shows in #modal (drawn by <Dialog_hosts/>): header (title,
   help tip, x), body (message slot + grid) or, for a dialog without content, the help as its text in a compact layout
   without dividers, and the footer (Cancel + submit, or custom actions). */
import { useLayoutEffect, useRef } from 'react';
