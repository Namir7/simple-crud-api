const personModel = require('../database/models/person-model');
const Person = require('../factories/person-factory');

const {
   _utils_checkNewPerson,
   _utils_checkEditPersonData,
   _utils_getId,
   _utils_validateId,
} = require('./person-controller.utils');

class PersonController {
   getOne(req, res) {
      const id = _utils_getId(req.url);

      if (!_utils_validateId(id)) {
         res.writeHead(400, 'failed');
         return res.end(`inappropriate "${id}" id value`);
      }

      const person = personModel.getOne(id);

      if (!person) {
         res.writeHead(404, 'failed');
         return res.end(`person with "${id}" id doesn't exist`);
      } else {
         res.writeHead(200, 'success', { 'Content-Type': 'application/json' });
         return res.end(JSON.stringify(person));
      }
   }

   getAll(req, res) {
      const persons = personModel.getAll();

      res.writeHead(200, 'success', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(persons));
   }

   async create(req, res) {
      req.on('data', async (data) => {
         const body = JSON.parse(data.toString('utf-8'));

         const isPeronValid = _utils_checkNewPerson(body);

         if (!isPeronValid) {
            res.writeHead(400, 'failed');
            return res.end(`incorrect "${data}" person value`);
         } else {
            const person = await personModel.create(new Person({ ...body }));

            res.writeHead(200, 'success', {
               'Content-Type': 'application/json',
            });
            return res.end(JSON.stringify(person));
         }
      });
   }

   async edit(req, res) {
      const id = _utils_getId(req.url);

      if (!_utils_validateId(id)) {
         res.writeHead(400, 'failed');
         return res.end(`inappropriate "${id}" id value`);
      }

      const person = personModel.getOne(id);

      if (!person) {
         res.writeHead(404, 'failed');
         return res.end(`person with "${id}" id doesn't exist`);
      }

      req.on('data', async (data) => {
         const body = JSON.parse(data.toString('utf-8'));

         const isDataValid = _utils_checkEditPersonData(body);

         if (!isDataValid) {
            res.writeHead(400, 'failed');
            return res.end(
               `inappropriate person value: ${JSON.stringify(body)}`
            );
         } else {
            const person = await personModel.edit(id, body);

            res.writeHead(200, 'success', {
               'Content-Type': 'application/json',
            });
            return res.end(JSON.stringify(person));
         }
      });
   }

   async delete(req, res) {
      const id = _utils_getId(req.url);

      if (!_utils_validateId(id)) {
         res.writeHead(400, 'failed');
         return res.end(`inappropriate "${id}" id value`);
      }

      const person = personModel.getOne(id);

      if (!person) {
         res.writeHead(404, 'failed');
         return res.end(`person with "${id}" id doesn't exist`);
      }

      await personModel.delete(id);
      res.writeHead(204, 'success', {
         'Content-Type': 'application/json',
      });
      return res.end();
   }
}

module.exports = new PersonController();
