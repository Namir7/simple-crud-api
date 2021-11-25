const fs = require('fs/promises');

class DataAdapter {
   constructor(path) {
      this.path = path;
   }

   async read() {
      const data = await fs
         .readFile(this.path)
         .then((dataStr) => JSON.parse(dataStr));

      return data;
   }

   async write(data) {
      await fs.writeFile(this.path, JSON.stringify(data));
   }
}

module.exports = DataAdapter;
