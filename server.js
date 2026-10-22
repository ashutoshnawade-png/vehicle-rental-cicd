const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT || 8080);
const htmlPath = path.join(__dirname, 'public', 'index.html');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok');
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(htmlPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Could not load the Vehicle Rental System page.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Vehicle Rental System running on port ${PORT}`);
  });
}

module.exports = server;
