const path = require('path');
const Database = require('./Database');

const dataPath = path.resolve(
   __dirname,
   '..',
   process.env.DATA_FILE_NAME || 'data.json'
);

const database = new Database();
const models = ['person'];

database.configure(dataPath, models);

module.exports = database;
