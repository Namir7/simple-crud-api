const personProperties = [
   { name: 'name', type: 'string' },
   { name: 'age', type: 'number' },
   { name: 'hobbies', type: 'object' },
];

const _utils_checkNewPerson = (person) => {
   let isValid = true;

   personProperties.forEach((property) => {
      const isExist = Object.keys(person).includes(property.name);
      if (!isExist) isValid = false;

      const isCorrectType = typeof person[property.name] === property.type;
      if (!isCorrectType) isValid = false;
   });

   return isValid;
};

const _utils_checkEditPersonData = (newData) => {
   let isValid = true;

   Object.entries(newData).forEach((entry) => {
      const [key, value] = entry;

      const isExist = personProperties.some(
         (property) => property.name === key
      );

      if (!isExist) {
         isValid = false;
         return;
      }

      const isCorrectType =
         typeof value ===
         personProperties.find((property) => property.name === key).type;

      if (!isCorrectType) isValid = false;
   });

   return isValid;
};

const _utils_getId = (url) => {
   return url.replace('/', '');
};

module.exports = {
   _utils_checkNewPerson,
   _utils_checkEditPersonData,
   _utils_getId,
};
