class Model {
   constructor(database) {
      this.database = database;

      this._modelName = null;
   }

   getOne(id) {
      this.database.item_find(this._modelName, id);
   }

   getAll() {
      this.database.item_findOne(this._modelName);
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
