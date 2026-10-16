const http = require('node:http');

function createServer() {
  return http.createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.end('Hello from my Docker Node.js server!!');
  });
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  createServer().listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { createServer };