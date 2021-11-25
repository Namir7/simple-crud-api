const personModel = require('../database/models/person-model');
const Person = require('../factories/person-factory');

class PersonController {
   async getOne(req, res) {
      const id = req.
      
      const person = personModel.getOne(id);
   }

   // async getAll(req, res) {
   //    const persons = personModel.getAll();
   // }
   // async create(req, res) {
   //    const person = new Person(data);

   //    personModel.create(person);
   // }

   // async edit(req, res) {
   //    personModel.edit(id, newData);
   // }

   // async delete(req, res) {
   //    personModel.delete(id);
   // }
}

module.exports = new PersonController();
