const uuid = require('uuid');

class Person {
   constructor(payload) {
      if (!payload.name && payload.age && payload.hobbies)
         throw new Error(
            `cant create Person with current attributes: ${JSON.stringify(
               payload
            )}`
         );

      this.id = uuid();

      this.name = payload.name;
      this.age = payload.age;
      this.hobbies = payload.hobbies;
   }
}

module.exports = Person;
