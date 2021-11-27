const fs = require('fs');
const fsPromise = require('fs/promises');

class DataAdapter {
   constructor(path) {
      this.path = path;
   }

   async read() {
      const data = await fsPromise
         .readFile(this.path)
         .then((dataStr) => JSON.parse(dataStr));

      return data;
   }

   async write(data) {
      await fsPromise.writeFile(this.path, JSON.stringify(data));
   }

   readSync() {
      const data = JSON.parse(fs.readFileSync(this.path));
      return data;
   }
}

module.exports = DataAdapter;
