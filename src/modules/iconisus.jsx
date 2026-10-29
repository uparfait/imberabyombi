/* modules/iconisus.jsx: the Iconisus module (/admin/icons), the 3D icon maker. Its page loads the first time someone opens
   it (a separate file in the build); meanwhile the page shows the loading spinner. */
import { lazy, Suspense } from 'react';
import { VIEWS } from './views.js';
import { loading } from '../feedback/index.js';

const Iconisus_page = lazy(() => import('../iconisus/index.js').then(m => ({ default: m.Iconisus_page })));
