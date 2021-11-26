const database = require('./database');

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
      await this.database.item_insert(this._modelName, data);
   }

   async edit(id, newData) {
      await this.database.item_edit(this._modelName, id, newData);
   }

   async delete(id) {
      await this.database.item_delete(this._modelName, id);
   }
}

module.exports = Model;
