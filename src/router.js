const personRoute = require('./routes/person-route');

class Router {
   constructor(routes, options) {
      this.baseUrl = options?.baseUrl || '/api';
      this._routes = routes;
   }

   resolver(req, res) {
      const route = this._utils_findRoute(req.url);

      if (!route) {
         res.writeHead(404, 'failed');
         return res.end('invalid url');
      }
      req.url = req.url.replace(
         new RegExp(`${this.baseUrl}/${route.name}/{0,1}`),
         '/'
      );

      return route.resolver(req, res);
   }

   _utils_findRoute(url) {
      for (let i = 0; i < this._routes.length; i++) {
         const route = this._routes[i];
         const rule = new RegExp(`${this.baseUrl}/${route.name}/{0,1}\\w{0,}`);

         if (rule.test(url)) return route;
      }

      return null;
   }
}

module.exports = new Router([personRoute]);
