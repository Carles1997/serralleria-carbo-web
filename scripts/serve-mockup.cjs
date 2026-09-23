const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.md': 'text/plain; charset=utf-8',
};

http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }

  if (pathname === '/') {
    response.writeHead(302, { Location: '/FASE4-mockups/home/' }).end();
    return;
  }

  const publicAsset = pathname.startsWith('/FASE4-mockups/home/') ||
    pathname.startsWith('/FASE4-mockups/home-v0/') ||
    pathname.startsWith('/FASE2-propostes/assets/') ||
    pathname === '/design/tokens.css' ||
    pathname.startsWith('/design/fonts/');
  if (!publicAsset) {
    response.writeHead(404).end();
    return;
  }

  const requested = path.resolve(root, '.' + pathname);
  if (!requested.startsWith(root + path.sep)) {
    response.writeHead(403).end();
    return;
  }

  fs.stat(requested, (error, info) => {
    const file = !error && info.isDirectory() ? path.join(requested, 'index.html') : requested;
    fs.stat(file, (fileError, fileInfo) => {
      if (fileError || !fileInfo.isFile()) {
        response.writeHead(404).end();
        return;
      }
      response.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
      if (request.method === 'HEAD') response.end();
      else fs.createReadStream(file).pipe(response);
    });
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`Mockup: http://localhost:${port}/`);
});
