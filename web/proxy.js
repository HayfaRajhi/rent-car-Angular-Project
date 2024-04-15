const http = require('http');
const httpProxy = require('http-proxy');

// Create a new proxy server
const proxy = httpProxy.createProxyServer({
  target: 'https://location-cars-22691-lnm5nd2pia-uc.a.run.app',
  headers: {
    host: 'location-cars-22691-lnm5nd2pia-uc.a.run.app',
    origin: 'http://localhost:4200'
  }
});

// Create a basic HTTP server
const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');


  // Proxy the request to the REST API
  proxy.web(req, res, {}, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Something went wrong.');
  });
});

// Listen on a port
const port = 8085;
server.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
