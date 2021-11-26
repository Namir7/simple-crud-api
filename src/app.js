require('dotenv').config();

const http = require('http');
const router = require('./router');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
   router.resolver(req, res);
});

server.listen(port, () => {
   console.log(`server is listening on port ${port}`);
});
