const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const html = fs.readFileSync('dist/index.html', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  } else if (req.url.startsWith('/assets/')) {
    const file = path.join('dist', req.url);
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file);
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.end(content);
    } else {
      res.writeHead(404);
      res.end();
    }
  }
});

server.listen(8124, () => {
  console.log('Test server running on http://localhost:8124');
  console.log('Open in browser or use curl to test:');
  console.log('curl http://localhost:8124/');
});
