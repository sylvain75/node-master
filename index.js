const http = require('http');
const server = http.createServer((req, res) => {
  res.end('hello\n')
});

server.listen(3000, () =>{
  console.log('The server is listenning on Port 3000');
})