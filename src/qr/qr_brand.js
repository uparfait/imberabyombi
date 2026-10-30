/* qr/qr_brand.js: Qr-scan wears the site's look as set in Settings (brand colour, corner radius, spacing, font; kept in this
   browser with the site's other data, cfg.ns + 'tokens'), on the page and in what is installed. brand_apply() sets them at
   start and the light theme colour; when the brand colour is not the default, it also makes the manifest here (theme
   colour = the brand; icons: the site's mark drawn in the brand colour by the 3D engine), in place of the default one
   (public/qr-scan/manifest.webmanifest), and the tab and home-screen icons the same. brand() is that colour. */
import { cfg } from '../config/index.js';
