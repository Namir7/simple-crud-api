const { v4: uuidv4 } = require('uuid');

class PersonFactory {
   constructor(payload) {
      if (!payload.name && payload.age && payload.hobbies)
         throw new Error(
            `cant create Person with current attributes: ${JSON.stringify(
               payload
            )}`
         );

      this.id = uuidv4();

      this.name = payload.name;
      this.age = payload.age;
      this.hobbies = payload.hobbies;
   }
}

module.exports = PersonFactory;
