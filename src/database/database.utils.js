class Utils_DataBase {
   findItem(modelName, id, data) {
      const itemIndex = this.findIndexById(modelName, id, data);
      return itemIndex !== -1 ? data[modelName].items[itemIndex] : null;
   }

   findIndexById(modelName, id, data) {
      return data[modelName].items.findIndex((item) => item.id === id);
   }

   checkIfExists(modelName, id, data) {
      const index = this.findIndexById(modelName, id, data);

      if (index === -1)
         throw new Error(`${modelName} model already has item with ${id} id`);
   }

   checkIfNotExists(modelName, id, data) {
      const index = this.findIndexById(modelName, id, data);

      if (index !== -1)
         throw new Error(
            `item with ${id} id doesn't exist in ${modelName} model`
         );
   }

   checkModelExists(modelName, data) {
      if (!data[modelName])
         throw new Error(`${modelName} model doesn't exist in database`);
   }
}

module.exports = Utils_DataBase;
