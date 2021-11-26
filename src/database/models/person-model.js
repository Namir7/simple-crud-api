const Model = require('../Model');
const database = require('../database');

(async () => {
   await database.configure();
})();

module.exports = new Model('person');
