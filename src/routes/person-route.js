const personController = require('../controllers/person-controller');

class PersonRoute {
   constructor(pathes) {
      this._pathes = pathes;
   }

   resolver(req, res) {}
}

const personRoute = new PersonRoute([
   {
      path: '/',
      method: 'GET',
   },
   {
      path: new RegExp('//d+'),
      method: 'GET',
   },
   {
      path: '/',
      method: 'POST',
   },
   {
      path: '/',
      method: 'PUT',
   },
   {
      path: '/',
      method: 'DELETE',
   },
]);

module.exports = personRoute;
