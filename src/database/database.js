const path = require('path');
const DataAdapter = require('./database.adapter');
const Utils_DataBase = require('./database.utils');

class DataBase {
   constructor(dataPath) {
      this._dataAdapter = new DataAdapter(dataPath);
      this._utils = new Utils_DataBase();

      this.data = null;
   }

   async configure() {
      this.data = await this._dataAdapter.read();
   }

   item_find(modelName, id) {
      this._utils.checkModelExists(modelName, this.data);

      const foundItem = this._utils.findIndexById(modelName, id);
      return foundItem ? foundItem : null;
   }

   item_findAll(modelName) {
      this._utils.checkModelExists(modelName, this.data);

      return this.data[modelName].items;
   }

   async item_insert(modelName, modelItem) {
      this._utils.checkModelExists(modelName, this.data);
      this._utils.checkIfNotExists(modelName, modelItem.id);

      const modelItems = this.data[modelName].items;

      modelItems.push(modelItem);
      await this._dataAdapter.write(this.data);
   }

   async item_edit(modelName, id, newData) {
      this._utils.checkModelExists(modelName, this.data);
      this._utils.checkIfNotExists(modelName, id);

      this.data[modelName].items[this._utils.findIndexById(modelName, id)] = {
         ...newData,
         id,
      };

      await this._dataAdapter.write(this.data);
   }

   async item_delete(modelName, id) {
      this._utils.checkModelExists(modelName, this.data);
      this._utils.checkIfExists(modelName, id);

      this.data[modelName].items.splice(
         this._utils.findIndexById(modelName, id),
         1
      );

      this._dataAdapter.write(this.data);
   }
}

const dataPath = path.resolve(__dirname, '..', 'data.json');
const database = new DataBase(dataPath);

module.exports = database;
