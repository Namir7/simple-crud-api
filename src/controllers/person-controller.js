const personModel = require('../database/models/person-model');
const Person = require('../factories/person-factory');

class PersonController {
   async getOne(req, res) {
      res.end('person getOne method');

      // const id = req.
      // const person = personModel.getOne(id);
   }

   async getAll(req, res) {
      const persons = personModel.getAll();

      console.log(persons);
      return res.end('getAll');
      // res.end(JSON.stringify(persons));
   }

   async create(req, res) {
      res.end('person create method');

      // const person = new Person(data);
      // personModel.create(person);
   }

   async edit(req, res) {
      res.end('person edit method');

      // personModel.edit(id, newData);
   }

   async delete(req, res) {
      res.end('person delete method');

      // personModel.delete(id);
   }
}

module.exports = new PersonController();
