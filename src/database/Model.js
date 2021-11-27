const database = require('./database.instance');

class Model {
   constructor(name) {
      this.database = database;

      this._modelName = name;
   }

   getOne(id) {
      return this.database.item_find(this._modelName, id);
   }

   getAll() {
      return this.database.item_findAll(this._modelName);
   }

   async create(data) {
      const person = await this.database.item_insert(this._modelName, data);
      return person;
   }

   async edit(id, newData) {
      const person = await this.database.item_edit(
         this._modelName,
         id,
         newData
      );
      return person;
   }

   async delete(id) {
      await this.database.item_delete(this._modelName, id);
      return true;
   }
}

module.exports = Model;
