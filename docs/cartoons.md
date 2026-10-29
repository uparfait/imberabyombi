# Cartoon pictures and the sample video

Every sample picture in the template is a flat cartoon drawn in the browser from a seed. Only the home hero
(`cfg.hero`) is a real picture. Nothing is downloaded for them, so pages stay light on slow connections and work
offline, and the same seed always draws the same picture. Code: [`src/cartoons/`](../src/cartoons/).

## Using them
| Call | Draws | Used by |
|---|---|---|
| `cfg.img(seed, w, h)` | a scene in that shape: a street, a park, an office, an event stage or mountains | about, articles, events, `/ui` |
| `cfg.face(n, w, h)` | a head-and-shoulders portrait (`h > w` for a tall card) | team cards, testimonials, avatar stacks |

Both return an image address (an SVG data URI), so they go straight into `<img src>`:

```jsx
<img src={cfg.img('services', 900, 650)} alt="…" width="900" height="650" loading="lazy" />
<img src={cfg.face(7, 320, 400)} alt="Portrait of …" width="320" height="400" />
```

- The seed picks the scene. A seed that starts with `event` gets a stage, a park or a street; one that starts with
  `about` gets the office or the park. To choose the scene yourself: `cartoon(seed, w, h, 'mountains')` from
  `src/cartoons/index.js` (`'city'`, `'park'`, `'office'`, `'stage'`, `'mountains'`).
- Scenes are drawn for their shape: wide, tall or square pictures each get a fitting layout.
- People come in many skin tones, hairstyles, clothes and poses (standing, waving, walking, pointing, cheering).

## Changing the look
- Colours: [`src/cartoons/palette.js`](../src/cartoons/palette.js) (skies, hills, buildings, skins, hair, clothes; the
  brand orange is the main accent).
- Your own pictures: the parts are exported (`person`, `look`, `head`, `sky`, `hill`, `tree`, `bush`, `shapes`,
  `palette`, `rng`). Draw an SVG string and pass it to `svg_data_uri()`.
- Real photos instead: point `cfg.img` and `cfg.face` (src/config/site_config.js) at your image addresses; every
  caller keeps working.
