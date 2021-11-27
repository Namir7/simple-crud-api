require('dotenv').config();

const http = require('http');
const router = require('./router');
const internalServerErrorHandler = require('./middleware/internal-server-error');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
   try {
      router.resolver(req, res);
   } catch (e) {
      console.log(e);
      internalServerErrorHandler(req, res);
   }
});

server.listen(port, () => {
   console.log(`server is listening on port ${port}`);
});
