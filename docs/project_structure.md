# Project structure

```
index.html            SEO head, theme boot (no flash), overlay elements (#modal, #picker, #toasts …), templates
public/               favicon.svg, robots.txt, sitemap.xml (copied as they are into dist/)
public/media/         the cartoon sample video and its poster, the social share image, the PNG logo
src/main.jsx          entry: stylesheet (in order), mounts <App/> in #app, starts the router (boot)
