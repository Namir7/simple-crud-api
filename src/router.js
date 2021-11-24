const person = require('./routes/person-route');

class Router {
   constructor(routes, options) {
      this.baseUrl = options.baseUrl ? options.baseUrl : '/api';
      this.routes = routes;
   }
}

module.exports = new Router([person]);
