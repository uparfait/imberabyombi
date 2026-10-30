/* admin/notice_menu.jsx: the bell in the header: a count of unread notices (admin/notices.js) and, on click, the list
   (newest worries first). A notice opens what it is about and is then read; "Mark all read" clears the count. The list
   is drawn at the top of the page like the account menu (a portal placed under its button). */
import { createPortal } from 'react-dom';
import { ic } from '../icons/index.js';
import { closed_pop } from './live_slot.jsx';
import { notices, notices_read } from './notices.js';
