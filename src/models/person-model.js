const Model = require('../../Model');
const database = require('../database');

class PersonModel extends Model {
   constructor() {
      super();

      this._modelName = 'person';
   }
}

module.exports = new PersonModel(database);
