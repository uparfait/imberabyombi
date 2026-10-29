/* sign/sign_page.jsx: Sign_page, O-Doc Sign's whole window (no admin header or sidebar, like the document editor): its own
   top bar and the page for the address.
     /admin/sign · /drafts · /waiting · /completed · /inbox   the lists        /new   upload a PDF
     /edit/<id> prepare a draft   /doc/<id> follow a sent document   /sign/<id> sign it   /done/<id> signed
   A document opened at the wrong address moves to the right one (a sent draft to its page, someone else's to signing). */
import { useEffect } from 'react';
import './sign_styles.css';
import './sign_act.js';
import { ic } from '../icons/index.js';
import { route } from '../store/index.js';
import { auth } from '../auth/index.js';
import { loading } from '../feedback/index.js';
