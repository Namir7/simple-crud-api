class Model {
   constructor(name, database) {
      this.database = database;
      this._modelName = name;
   }

   getOne(id) {
      this.database.findOne(this._modelName, id);
   }

   getAll() {
      this.database.findOne(this._modelName);
   }

   create(data) {
      this.database.create(this._modelName, data);
   }

   edit(id, newData) {
      this.database.edit(this._modelName, id, newData);
   }

   delete(id) {
      this.database.delete(this._modelName, id);
   }
}

module.exports = Model;
