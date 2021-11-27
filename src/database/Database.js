const path = require('path');
const fs = require('fs');

const DataAdapter = require('./database.fs-adapter');
const Utils_DataBase = require('./database.utils');

class Database {
   constructor() {
      this._utils = new Utils_DataBase();

      this._dataAdapter = null;
      this.data = null;
   }

   static reset(models) {
      const dataFilePath =
         process.env.DATA_FILE_NAME ||
         path.resolve(__dirname, '..', 'data.json');

      const backupDataFilePath = path.resolve(
         __dirname,
         '..',
         'data.backup.json'
      );

      const databaseStructure = models
         ? models.reduce((acc, model) => {
              acc[model] = Object.assign({}, { items: [] });
              return acc;
           }, {})
         : Object.create({});

      if (fs.existsSync(dataFilePath)) {
         const oldData = fs.readFileSync(dataFilePath, { encoding: 'utf8' });
         fs.writeFileSync(backupDataFilePath, oldData, { encoding: 'utf8' });
      }

      fs.writeFileSync(dataFilePath, JSON.stringify(databaseStructure), {
         encoding: 'utf8',
      });
   }

   configure(dataPath, models) {
      this._dataAdapter = new DataAdapter(dataPath);

      try {
         this.data = this._dataAdapter.readSync();
      } catch (e) {
         if (e.message === 'Unexpected end of JSON input')
            // data file is incorrect
            throw new Error(
               'data.json file have incorrect inner data\nyou can run "npm run reset-db" script to fix that'
            );

         if (e.code === 'ENOENT') {
            // data file is not exists
            const databaseStructure = models
               ? models.reduce((acc, model) => {
                    acc[model] = Object.assign({}, { items: [] });
                    return acc;
                 }, {})
               : Object.create({});

            fs.writeFileSync(dataPath, JSON.stringify(databaseStructure), {
               encoding: 'utf8',
            });

            this.data = this._dataAdapter.readSync();
         } else {
            throw e;
         }
      }
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
      return modelItem;
   }

   async item_edit(modelName, id, newData) {
      this._utils.checkModelExists(modelName, this.data);
      this._utils.checkIfExists(modelName, id, this.data);

      const oldData = this._utils.findItem(modelName, id, this.data);
      const editedPerson = Object.assign(oldData, newData);

      this.data[modelName].items[
         this._utils.findIndexById(modelName, id, this.data)
      ] = editedPerson;

      await this._dataAdapter.write(this.data);
      return editedPerson;
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

module.exports = Database;
