/* kit/kit_web_component.jsx: the "Web component" specimen: <ds-callout> (defined once by the app from
   <template id="tpl_callout"> in index.html) with a named title slot and default slot text. */
import { lorem } from '../lib/index.js';

export const kit_web_component = () => (
  <>
    <ds-callout><h4 slot="title">{lorem.t(3)}</h4>{lorem.s(12, 18)}</ds-callout>
    <p className="mt-4 text-sm text-muted">Built from <code>{'<template id="tpl_callout">'}</code> with named <code>{'<slot>'}</code> elements.
      It inherits every token through the shadow DOM.</p>
  </>
);
