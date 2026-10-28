/* editor/core/toast.js: the editor's short messages. toast(msg, ms) keeps the source's name: on staff pages it shows
   the template's notification (notify(msg, 'info')); elsewhere a short status line at the bottom of the screen.
   ms = 0 is a progress message (kept open and updated in place until hide_toast()). While a live preview runs, messages
   are collected instead of shown (quiet), and shown if the preview is kept. */
import { notify, staff_page } from '../../feedback/index.js';
import { qs, el } from './utils.js';
