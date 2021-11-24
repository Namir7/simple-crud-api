require('dotenv');

const http = require('http');
const router = require('./router');

const server = http.createServer(router);

server.listen(process.env.PORT || 3000, () => {
    console.log();
});
