import { createReadStream, promises as fs } from "node:fs";
import { createServer } from "node:http";
import { extname, relative, resolve, sep } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

import worker from "../.output/server/index.mjs";

const publicDirectory = resolve(fileURLToPath(new URL("../.output/public/", import.meta.url)));
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

async function serveStatic(request, response, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return false;

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    response.writeHead(400).end("Invalid URL path");
    return true;
  }

  const filePath = resolve(publicDirectory, `.${decodedPath}`);
  const relativePath = relative(publicDirectory, filePath);
  if (relativePath.startsWith(`..${sep}`) || relativePath === "..") {
    response.writeHead(403).end("Forbidden");
    return true;
  }

  let fileInfo;
  try {
    fileInfo = await fs.stat(filePath);
  } catch {
    return false;
  }
  if (!fileInfo.isFile()) return false;

  const hashedAsset = decodedPath.startsWith("/assets/");
  response.writeHead(200, {
    "Content-Length": fileInfo.size,
    "Content-Type": mimeTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream",
    "Cache-Control": hashedAsset ? "public, max-age=31536000, immutable" : "no-cache",
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(filePath).pipe(response);
  return true;
}

const server = createServer(async (incoming, outgoing) => {
  try {
    const url = new URL(incoming.url ?? "/", `http://${incoming.headers.host ?? "localhost"}`);
    if (await serveStatic(incoming, outgoing, url.pathname)) return;

    const hasBody = incoming.method !== "GET" && incoming.method !== "HEAD";
    const request = new Request(url, {
      method: incoming.method,
      headers: new Headers(incoming.headers),
      ...(hasBody ? { body: incoming, duplex: "half" } : {}),
    });
    const result = await worker.fetch(request, process.env, {
      waitUntil: (promise) => void Promise.resolve(promise).catch(console.error),
    });
    outgoing.writeHead(result.status, Object.fromEntries(result.headers));
    if (result.body) Readable.fromWeb(result.body).pipe(outgoing);
    else outgoing.end();
  } catch (error) {
    console.error(error);
    if (!outgoing.headersSent) outgoing.writeHead(500);
    outgoing.end("Local preview failed");
  }
});

const argValue = (name) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
};
const port = Number(process.env.PORT ?? argValue("--port") ?? 3001);
const host = process.env.HOST ?? argValue("--host") ?? "127.0.0.1";

server.listen(port, host, () => {
  console.log(`Local preview listening at http://${host}:${port}`);
});
