/* modules/sign.jsx: the O-Doc Sign module (/admin/sign and its pages). Its code and styles load the first time someone
   opens it (a separate file in the build); meanwhile the page shows the loading spinner. */
import { lazy, Suspense } from 'react';
import { VIEWS } from './views.js';
import { loading } from '../feedback/index.js';
