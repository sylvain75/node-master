// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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

  // Get the payload if there is any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data) {
    // On the event of receiving piece of 'data' we decode it and append it the buffer string;
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();
    // Log the request path + method
    console.log('payload received:', buffer);

    // Send the response
    res.end('hello\n')
  });
});

server.listen(3000, () =>{
  console.log('The server is listenning on Port 3000');
})