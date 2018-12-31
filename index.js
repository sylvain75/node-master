// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./lib/config');
const fs = require('fs');

const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');

const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

// Instantiate http server
httpServer.listen(config.httpPort, () => {
  console.log(`The server is listenning on Port ${config.httpPort}`);
});

// Instantiate https server
const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem'),
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

// Start https server
httpsServer.listen(config.httpsPort, () =>{
  console.log(`The server is listenning on Port ${config.httpsPort}`);
});

// all the server logic for both http && https server
const unifiedServer = (req, res) => {
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
  req.on('data', data => {
    // On the event of receiving piece of 'data' we decode it and append it the buffer string;
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();
    // Log the request path + method
    console.log('payload received:', buffer);
    // Choose the handler this request should go to. If one is not found choose the not found one
    const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object the send to the handler
    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer)
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {

      // Use the status code called back by the handler, or default to 200
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to empty object
      payload = typeof (payload) == 'object' ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-type', 'application/json'); // make sure the response is sent back as JSON
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('Returning this response:', statusCode, payloadString);
    });
  });
};


// Define a request router
const router = {
  'ping': handlers.ping,
  'users': handlers.users,
}