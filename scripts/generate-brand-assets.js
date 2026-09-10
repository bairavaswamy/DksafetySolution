#!/usr/bin/env node

/**
 * Rasterize the font-independent premium SVG masters. Edit the SVG masters to
 * change the artwork, then run `node scripts/generate-brand-assets.js`.
 */
const path = require("node:path");
const fs = require("node:fs/promises");
const sharp = require("sharp");

const brandDirectory = path.join(__dirname, "..", "public", "brand");

async function png(source, destination, width, height = width) {
  const input = path.join(brandDirectory, source);
  const output = path.join(brandDirectory, destination);
  await sharp(input, { density: 288 })
    .resize(width, height, { fit: "contain", background: "#00000000" })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(output);
  const { size } = await fs.stat(output);
  console.log(`${destination}: ${width} × ${height}, ${size.toLocaleString()} bytes`);
}

async function main() {
  await png("dk-premium-wordmark.svg", "dk-premium-wordmark.png", 900, 338);
  await png("dk-premium-wordmark-light.svg", "dk-premium-wordmark-light.png", 900, 338);
  await png("dk-premium-symbol.svg", "dk-premium-symbol.png", 192);
  await png("dk-premium-favicon.svg", "dk-premium-favicon-16.png", 16);
  await png("dk-premium-favicon.svg", "dk-premium-favicon-32.png", 32);

  // ICO permits embedded PNG images; include both browser tab sizes for legacy
  // /favicon.ico requests as well as the explicit SVG/PNG metadata links.
  const faviconSizes = [16, 32];
  const faviconImages = await Promise.all(faviconSizes.map((size) =>
    fs.readFile(path.join(brandDirectory, `dk-premium-favicon-${size}.png`))
  ));
  const iconHeader = Buffer.alloc(6 + faviconImages.length * 16);
  iconHeader.writeUInt16LE(1, 2);
  iconHeader.writeUInt16LE(faviconImages.length, 4);
  let imageOffset = iconHeader.length;
  faviconImages.forEach((buffer, index) => {
    const entry = 6 + index * 16;
    iconHeader[entry] = faviconSizes[index];
    iconHeader[entry + 1] = faviconSizes[index];
    iconHeader.writeUInt16LE(1, entry + 4);
    iconHeader.writeUInt16LE(32, entry + 6);
    iconHeader.writeUInt32LE(buffer.length, entry + 8);
    iconHeader.writeUInt32LE(imageOffset, entry + 12);
    imageOffset += buffer.length;
  });
  await fs.writeFile(path.join(brandDirectory, "..", "favicon.ico"), Buffer.concat([iconHeader, ...faviconImages]));
  console.log(`favicon.ico: 16 + 32 pixel PNG entries, ${imageOffset.toLocaleString()} bytes`);

  // Opaque square icon canvas gives operating systems a clean, predictable crop.
  // The centered monogram stays within a 64% artwork safe area.
  for (const [destination, size] of [
    ["dk-premium-apple-touch-icon.png", 180],
    ["dk-premium-icon-192.png", 192],
    ["dk-premium-icon-512.png", 512],
  ]) {
    const symbolSize = Math.round(size * 0.64);
    const symbol = await sharp(path.join(brandDirectory, "dk-premium-symbol.svg"), { density: 288 })
      .resize(symbolSize, symbolSize)
      .png()
      .toBuffer();
    const output = path.join(brandDirectory, destination);
    await sharp({ create: { width: size, height: size, channels: 4, background: "#FAF8F4" } })
      .composite([{ input: symbol, gravity: "centre" }])
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(output);
    const { size: bytes } = await fs.stat(output);
    console.log(`${destination}: ${size} × ${size}, ${bytes.toLocaleString()} bytes`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
