const PersonModel = require('../models/Person');

class PersonRoute {
   constructor(model) {
      this.model = model;
   }

   getOne() {}

   getAll() {}

   create() {}

   edit() {}

   delete() {}
}

module.exports = new PersonRoute(PersonModel);
