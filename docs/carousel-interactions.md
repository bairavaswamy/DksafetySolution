# Home carousel and header

The header uses a static 32px phone strip above the existing navigation. Logo
wrappers are transparent and have no card background or persistent border. The
navigation spacing, image dimensions, home section sizes and carousel breakpoints
are preserved.

The carousel keeps its five service images, captions, links, arrows and centered
dots. A pause/play control sits beside the dots without moving them.

- Slides crossfade over 700ms against navy, after the incoming image is decoded.
- Autoplay waits six seconds and restarts its timer after manual navigation.
- Hover, dragging, hidden tabs and an off-screen carousel suspend autoplay.
- Keyboard navigation pauses rotation until Play is explicitly selected.
- Reduced-motion preferences disable initial autoplay and remove the fade.
- Left/right swipes and mouse drags navigate one slide; vertical gestures and
  small tap movements do not. Native vertical touch scrolling and pinch zoom
  remain enabled.
- Pointer capture begins only after horizontal intent. Capture-loss events from
  children are ignored so transferring implicit touch capture cannot cancel a
  swipe. A fresh pointer press clears the previous drag's click suppression.
- Inactive service links are excluded from keyboard navigation. Slide headings
  use H2, leaving the home page's existing H1 intact.

Run gesture regressions with `npm run test:carousel`. The tests cover wraparound,
swipe direction, accidental taps, vertical/diagonal movement and viewport-specific
thresholds. Browser checks additionally cover arrow/dot navigation, keyboard
controls, autoplay, horizontal drags, swiping over a CTA without navigation, and
then opening the active service with a normal tap.

Build with `npm run build`; the output remains a static `out/` directory.

References: [WAI carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
and [MDN touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action).
