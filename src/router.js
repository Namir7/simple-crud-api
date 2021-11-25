const personRoute = require('./routes/person-route');
const undefinedRoute = require('./routes/undefined-route');

class Router {
   constructor(routes, options) {
      this.baseUrl = options.baseUrl ? options.baseUrl : '/api';
   }

   config(req, res) {
      switch (req.url) {
         case `${this.baseUrl}/person`:
            return personRoute;

         default:
            return undefinedRoute;
      }
   }
}

module.exports = new Router([person]).config;
