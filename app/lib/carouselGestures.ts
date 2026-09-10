export function wrapSlideIndex(index: number, count: number): number {
  return ((index % count) + count) % count;
}

// Require a deliberate horizontal gesture; scrolling and small tap movements
// must never navigate the carousel.
export function getSwipeDirection(dx: number, dy: number, width: number): -1 | 0 | 1 {
  const threshold = Math.max(40, Math.min(80, width * 0.12));
  if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy) * 1.25) return 0;
  return dx < 0 ? 1 : -1;
}
