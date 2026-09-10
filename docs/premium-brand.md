# DK Safety Solutions premium identity

The identity pairs a bespoke architectural DK monogram with a restrained geometric wordmark. The precision-cut D frame and K interlock through one shared brass spine. The mark uses deliberate negative space and straight structural lines without a generic shield or decorative badge. The lettering has custom spacing and is stored as vector outlines, so the logo does not depend on a downloaded font or change when a device has different system fonts.

## Colour roles

| Colour | Hex | Role |
| --- | --- | --- |
| Midnight navy | `#142D3B` | Primary brand colour, headings, normal D frame |
| Deep navy | `#0C1E29` | Dark surfaces and reversed-mark lettering |
| Champagne brass | `#CFB77F` | Reversed monogram, reversed wordmark, highlights on dark surfaces |
| Brushed brass | `#B28C49` | K and shared monogram spine on light surfaces |
| Dark bronze | `#8F632C` | Secondary wordmark and small accent text on light surfaces |
| Warm ivory | `#FAF8F4` | Page background and light mark details |

Use champagne brass for accents on navy, and dark bronze for accent text on ivory. Avoid putting white text on the light brass colour. The site's bronze buttons use white text on the darker `#8F632C` background, which has a contrast ratio of approximately 5.26:1.

## Assets

All artwork is local under `public/brand/`; no remote logo service is required.

| Asset | Size | Use |
| --- | --- | --- |
| `dk-premium-wordmark.svg` / `.png` | 900 × 338 | Header and other light backgrounds |
| `dk-premium-wordmark-light.svg` / `.png` | 900 × 338 | Footer and other dark backgrounds |
| `dk-premium-symbol.svg` / `.png` | 192 × 192 | Mobile header and standalone brand mark |
| `dk-premium-favicon.svg` | 64 × 64 viewBox | Modern browser favicon |
| `dk-premium-favicon-16.png` | 16 × 16 | Small browser tab fallback |
| `dk-premium-favicon-32.png` | 32 × 32 | Browser tab fallback |
| `dk-premium-apple-touch-icon.png` | 180 × 180 | iOS home-screen icon |
| `dk-premium-icon-192.png` | 192 × 192 | Web manifest icon |
| `dk-premium-icon-512.png` | 512 × 512 | Web manifest icon |
| `public/favicon.ico` | 16 and 32 pixel PNG entries | Conventional browser fallback URL |

The wordmark deliberately retains the previous 900:338 aspect ratio. The header can keep its existing 52/56 pixel image height and the footer its existing 64 pixel height. The mobile symbol fits the existing 44 pixel square. Use the reversed wordmark directly on the dark footer; it has a transparent canvas and does not need a white backing panel.

The favicon uses the same bespoke monogram in ivory and champagne brass on a rounded navy tile. This retains readable letters at 16 pixels. The mobile SVG has enough native clear space to fit the existing circular 44 pixel image crop without clipping its architectural corners. The home-screen icons use an opaque ivory canvas and center the monogram inside a 64% artwork safe area, leaving generous room for operating-system icon masks.

## Regenerate raster assets

The four SVG files are the editable source artwork. Their lettering is already outlined. After an SVG edit, run:

```sh
npm run generate:brand
```

The script uses the project's `sharp` development dependency to generate all PNG sizes and the ICO container. It runs without fonts, external downloads, or credentials. The versioned `dk-premium-` filenames distinguish the identity from the previous cached logo and favicon files.

## Review

The generated assets were visually checked on ivory and dark navy backgrounds, including the desktop wordmark at 149 × 56 pixels, the mobile symbol at 44 × 44 pixels, and both 16 and 32 pixel favicons. A pixel check also verified that the circular mobile crop clips no visible part of the mark. The wordmark PNGs are approximately 10 KB each. No home-page section, spacing, or image dimensions are part of this identity change.
