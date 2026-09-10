const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(__dirname, "..", "out");
const args = process.argv.slice(2);
const portIndex = args.findIndex((arg) => arg === "--port" || arg === "-p");
const port = Number(portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("Provide a valid port (1-65535) using PORT or --port.");
  process.exit(1);
}
if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("Static export not found. Run npm run build before npm start.");
  process.exit(1);
}

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function isFile(filename) {
  return fs.existsSync(filename) && fs.statSync(filename).isFile();
}

const server = http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method Not Allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
    if (pathname.includes("\0")) throw new Error("Invalid path");
  } catch {
    response.writeHead(400);
    response.end("Bad Request");
    return;
  }

  const target = path.resolve(root, `.${pathname}`);
  const relative = path.relative(root, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (fs.existsSync(target) && fs.statSync(target).isDirectory() && !pathname.endsWith("/")) {
    const url = new URL(request.url, `http://${host}`);
    response.writeHead(308, { Location: `/${url.pathname.replace(/^\/+/, "")}/${url.search}` });
    response.end();
    return;
  }

  let filename = [target, path.join(target, "index.html"), `${target}.html`].find(isFile);
  if (!filename) {
    response.statusCode = 404;
    filename = path.join(root, "404.html");
  }
  if (!isFile(filename)) {
    response.writeHead(404);
    response.end("Not Found");
    return;
  }
  if (filename === path.join(root, "404.html")) response.statusCode = 404;

  response.setHeader("Content-Type", types[path.extname(filename)] || "application/octet-stream");
  response.setHeader("Content-Length", fs.statSync(filename).size);
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  const stream = fs.createReadStream(filename);
  stream.on("error", () => response.destroy());
  stream.pipe(response);
});

server.on("error", (error) => {
  console.error(`Static preview failed: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, host, () => {
  console.log(`Static preview running at http://${host}:${port} (serving out/)`);
});
