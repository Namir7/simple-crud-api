const personModel = require('../database/models/person-model');
const Person = require('../factories/person-factory');

const {
   _utils_checkNewPerson,
   _utils_checkEditPersonData,
   _utils_getId,
} = require('./person-controller.utils');

class PersonController {
   getOne(req, res) {
      const id = _utils_getId(req.url);
      const person = personModel.getOne(id);

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(person));
   }

   getAll(req, res) {
      const persons = personModel.getAll();

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(persons));
   }

   async create(req, res) {
      req.on('data', (data) => {
         const body = JSON.parse(data.toString('utf-8'));

         const isPeronValid = _utils_checkNewPerson(body);

         if (!isPeronValid) {
            return res.end('incorrect person data');
         } else {
            const person = new Person({ ...body });
            personModel.create(person);

            return res.end('person created');
         }
      });
   }

   async edit(req, res) {
      const id = _utils_getId(req.url);
      const person = personModel.getOne(id);

      if (!person) return res.end(`not user with ${id} id`);

      req.on('data', (data) => {
         const body = JSON.parse(data.toString('utf-8'));

         const isDataValid = _utils_checkEditPersonData(body);

         if (!isDataValid) {
            return res.end('incorrect data');
         } else {
            personModel.edit(id, body);

            return res.end('person edited');
         }
      });
   }

   async delete(req, res) {
      const id = _utils_getId(req.url);

      const person = personModel.getOne(id);

      if (!person) return res.end(`not user with ${id} id`);

      personModel.delete(id);
      res.end('person deleted');
   }
}

module.exports = new PersonController();
