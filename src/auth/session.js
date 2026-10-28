/* auth/session.js: who is signed in and what they may do. The session is kept in localStorage when "remember me" is on,
   otherwise in sessionStorage (ss; null when the browser blocks it). Plus the sign-in links shared with new people. */
import { cfg } from '../config/index.js';
import { db } from '../store/index.js';
