# Node without package.json

## Building a RESTful API
- Parsing url, path, query
- Getting the HTTP method, header, payload from the request

#### Commands
- `node index.js` open browser at localhost:3000
- `curl localhost:3000/sample` to test the sample path response || use postman
- `NODE_ENV="production" node index.js` to run server in production mode otherwise default to `stagging`
commit b871e9edb160731b82ac75d8ef89a2239c3d8631
- create https cert & key: `openssl req -newKey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`

