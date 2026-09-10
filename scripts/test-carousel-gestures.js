const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

// Exercise the actual shared gesture code without adding a browser/test dependency.
const filename = path.resolve(__dirname, "../app/lib/carouselGestures.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
});
const gestureModule = { exports: {} };
new Function("exports", "module", compiled.outputText)(gestureModule.exports, gestureModule);
const { getSwipeDirection, wrapSlideIndex } = gestureModule.exports;

test("carousel wraps in both directions, including rapid repeated navigation", () => {
  assert.equal(wrapSlideIndex(-1, 5), 4);
  assert.equal(wrapSlideIndex(5, 5), 0);
  assert.equal(wrapSlideIndex(-11, 5), 4);
  assert.equal(wrapSlideIndex(16, 5), 1);
  assert.equal(wrapSlideIndex(0, 5), 0);
});

test("left swipes advance and right swipes return to the previous slide", () => {
  assert.equal(getSwipeDirection(-100, 5, 390), 1);
  assert.equal(getSwipeDirection(100, -5, 390), -1);
});

test("stationary taps and small finger movements do not navigate", () => {
  assert.equal(getSwipeDirection(0, 0, 390), 0);
  assert.equal(getSwipeDirection(12, 2, 390), 0);
  assert.equal(getSwipeDirection(-12, -2, 390), 0);
});

test("vertical and diagonal page scrolling never becomes a swipe", () => {
  assert.equal(getSwipeDirection(10, 150, 390), 0);
  assert.equal(getSwipeDirection(-80, -160, 390), 0);
  assert.equal(getSwipeDirection(100, 100, 390), 0);
  assert.equal(getSwipeDirection(-100, 80, 390), 0);
  assert.equal(getSwipeDirection(-100, 79, 390), 1);
});

test("phone-sized viewports require a deliberate swipe distance", () => {
  assert.equal(getSwipeDirection(-46, 0, 390), 0);
  assert.equal(getSwipeDirection(-47, 0, 390), 1);
  assert.equal(getSwipeDirection(46, 0, 390), 0);
  assert.equal(getSwipeDirection(47, 0, 390), -1);
});

test("small viewports keep a minimum distance to prevent accidental navigation", () => {
  assert.equal(getSwipeDirection(-39, 0, 280), 0);
  assert.equal(getSwipeDirection(-40, 0, 280), 1);
});

test("wide screens do not require an excessively long drag", () => {
  assert.equal(getSwipeDirection(79, 0, 1440), 0);
  assert.equal(getSwipeDirection(80, 0, 1440), -1);
});
