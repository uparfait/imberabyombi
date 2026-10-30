# Project structure

```
index.html            SEO head, theme boot (no flash), overlay elements (#modal, #picker, #toasts …), templates
public/               favicon.svg, robots.txt, sitemap.xml (copied as they are into dist/)
public/media/         the cartoon sample video and its poster, the social share image, the PNG logo
src/main.jsx          entry: stylesheet (in order), mounts <App/> in #app, starts the router (boot)
src/app.jsx           root component: the page for the current route + the shared dialogs
src/styles/           the stylesheet: base/ (fonts, tokens, scaling, native elements), components/ (@layer components),
                      overrides/ (rules after the utilities); index.css and overrides.css import them in order
src/assets/fonts/     the three typefaces (woff2) and their licence
```

## Folders in `src/` (each has an `index.js` that re-exports its files)
| Folder       | Holds                                                                                       |
|--------------|---------------------------------------------------------------------------------------------|
