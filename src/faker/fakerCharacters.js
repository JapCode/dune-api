const { faker } = require('@faker-js/faker');
const generateCharacter = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  title: faker.music.genre(),
  factions: faker.name.jobTitle(),
  house: faker.music.genre(),
  species: faker.name.jobTitle(),
  planet: faker.name.jobTitle(),
  status: faker.name.jobTitle(),
  image: '',
});

const generateManyCharacters = (count) => {
  const limit = count || 10;
  const characters = [];
  for (let i = 0; i < limit; i++) {
    characters.push(generateCharacter());
  }
  return [...characters];
};

module.exports = {
  generateCharacter,
  generateManyCharacters,
};
