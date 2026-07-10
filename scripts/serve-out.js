const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(requestUrl) {
  const cleanUrl = decodeURIComponent(requestUrl.split("?")[0] || "/");
  const normalizedUrl = cleanUrl.endsWith("/") ? `${cleanUrl}index.html` : cleanUrl;
  let filePath = path.normalize(path.join(root, normalizedUrl));

  if (!filePath.startsWith(root)) {
    return null;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const htmlFile = `${filePath}.html`;
    const indexFile = path.join(filePath, "index.html");

    if (fs.existsSync(htmlFile)) {
      return htmlFile;
    }

    if (fs.existsSync(indexFile)) {
      return indexFile;
    }
  }

  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    filePath = `${filePath}.html`;
  }

  if (!fs.existsSync(filePath)) {
    return path.join(root, "404.html");
  }

  return filePath;
}

const server = http.createServer((request, response) => {
  const filePath = resolveFile(request.url || "/");

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (path.basename(filePath) === "404.html") {
    response.statusCode = 404;
  }

  response.setHeader("Content-Type", types[path.extname(filePath)] || "application/octet-stream");
  fs.createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static preview running at http://127.0.0.1:${port}`);
});
