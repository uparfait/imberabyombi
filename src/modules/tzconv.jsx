/* modules/tzconv.jsx: the time zone converter (/admin/tz). Its page loads the first time someone opens it (a separate file
   in the build); meanwhile the page shows the loading spinner. */
import { lazy, Suspense } from 'react';
import { VIEWS } from './views.js';
