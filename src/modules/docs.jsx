/* modules/docs.jsx: the Document editor module (/admin/docs). The editor is large, so its code and styles load the first
   time someone opens it (a separate file in the build); meanwhile the page shows the loading spinner. */
import { lazy, Suspense } from 'react';
import { VIEWS } from './views.js';
import { loading } from '../feedback/index.js';

const Editor_page = lazy(() => import('../editor/index.js').then(m => ({ default: m.Editor_page })));
