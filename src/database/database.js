const path = require('path');
const DataAdapter = require('./database.adapter');
const Utils_DataBase = require('./database.utils');

class DataBase {
   constructor(dataPath) {
      this._dataAdapter = new DataAdapter(dataPath);
      this._utils = new Utils_DataBase();

      this.data = null;
   }

   configure() {
      this.data = this._dataAdapter.readSync();
   }

   item_find(modelName, id) {
      this._utils.checkModelExists(modelName, this.data);

      const foundItem = this._utils.findItem(modelName, id, this.data);
      return foundItem;
   }

   item_findAll(modelName) {
      this._utils.checkModelExists(modelName, this.data);

      return this.data[modelName].items;
   }

   async item_insert(modelName, modelItem) {
      this._utils.checkModelExists(modelName, this.data);
      this._utils.checkIfNotExists(modelName, modelItem.id, this.data);

      const modelItems = this.data[modelName].items;

      modelItems.push(modelItem);
      await this._dataAdapter.write(this.data);
   }

   async item_edit(modelName, id, newData) {
      this._utils.checkModelExists(modelName, this.data);
      this._utils.checkIfExists(modelName, id, this.data);

      const oldData = this._utils.findItem(modelName, id, this.data);

      this.data[modelName].items[
         this._utils.findIndexById(modelName, id, this.data)
      ] = Object.assign(oldData, newData);

      await this._dataAdapter.write(this.data);
   }

   async item_delete(modelName, id) {
      this._utils.checkModelExists(modelName, this.data);
      this._utils.checkIfExists(modelName, id, this.data);

      this.data[modelName].items.splice(
         this._utils.findIndexById(modelName, id, this.data),
         1
      );

      this._dataAdapter.write(this.data);
   }
}

const dataPath = path.resolve(__dirname, '..', 'data.json');
const database = new DataBase(dataPath);
database.configure();

module.exports = database;
