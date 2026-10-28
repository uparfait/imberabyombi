# How to add a public page

Public pages are detail pages: a branded hero, the page's own top content, then long-form text, all from one entry.

## 1. Write the content
Create a section in `src/site/`, for example `src/site/services_sec.jsx`:
```jsx
/* site/services_sec.jsx: the Services section (home) and the top of the Services page */
import { sec_head, spy_attrs } from './site_bits.jsx';

export const services_sec = (page = 0) => (
  <section className="section" {...spy_attrs('services', page)}>
    <div className="wrap">
      {sec_head('Services', 'What we offer', 'One sentence that explains the services.')}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {['Design', 'Build', 'Support'].map((t, i) => (
          <article key={t} className="card p-6" data-reveal="" style={{ '--d': `${i * 0.08}s` }}>
