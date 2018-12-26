// Dependencies
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path (eg: http://localhost:3000/users  => the path is '/users'
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Send the response
  res.end('hello\n')
});

server.listen(3000, () =>{
  console.log('The server is listenning on Port 3000');
})