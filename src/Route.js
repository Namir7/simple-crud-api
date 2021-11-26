class Route {
   constructor(name, pathes) {
      this.name = name;
      this._pathes = pathes;
   }

   resolver(req, res) {
      const path = this._utils_findMatchedPath(req.url, req.method);

      if (!path) res.end(`undefined ${this.name} path`);
      else path.controller(req, res);
   }

   _utils_findMatchedPath(url, method) {
      for (let i = 0; i < this._pathes.length; i++) {
         const path = this._pathes[i];

         const isMethodMathced = method === path.method;

         const isUrlMatched =
            path.url instanceof RegExp ? path.url.test(url) : url === path.url;

         if (isUrlMatched && isMethodMathced) return path;
      }

      return null;
   }
}

module.exports = Route;
