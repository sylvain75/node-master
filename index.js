// Dependencies
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path (eg: http://localhost:3000/users  => the path is '/users'
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as object (http://localhost:3000/user?name=john => query string is 'name=john'
  const queryStringObject = parsedUrl.query;
  // queryStringObject => { name: 'john' }

  // Get the http method
  const method = req.method.toLowerCase();

  // Get the header as object
  const headers = req.headers;

  // Log the request path + method
  console.log('Trimmed path + method + queryStringObject', trimmedPath, method, queryStringObject, 'headers:', headers);

  // Send the response
  res.end('hello\n')
});

server.listen(3000, () =>{
  console.log('The server is listenning on Port 3000');
})