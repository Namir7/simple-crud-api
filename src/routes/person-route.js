const Route = require('../Route');
const controller = require('../controllers/person-controller');

const personRoute = new Route('person', [
   {
      url: '/',
      method: 'GET',
      controller: controller.getAll,
   },
   {
      url: /\/[\w-]/,
      method: 'GET',
      controller: controller.getOne,
   },
   {
      url: '/',
      method: 'POST',
      controller: controller.create,
   },
   {
      url: '/',
      method: 'PUT',
      controller: controller.edit,
   },
   {
      url: '/',
      method: 'DELETE',
      controller: controller.delete,
   },
]);

module.exports = personRoute;
