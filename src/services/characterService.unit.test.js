const CharacterService = require('./characterService');
const CharactersSchema = require('../schemas/charactersSchema');
const { generateManyCharacters } = require('../faker/fakerCharacters');

const characterMutable = [
  { id: '65dbcaf4-4851-45c3-aa00-72c5ff5f6895', name: 'Mack Vandervort' },
  { id: 'dcdccdc8-8f29-483a-ab6f-f052b790b5ca', name: 'Ramona Feil' },
];

const mockGetAll = jest.fn();
const mockGetSingle = jest.fn();
const mockUpdate = jest.fn();
const mockCreate = jest.fn();
const mockDelete = jest.fn();
jest.mock('../lib/mongoLib', () => {
  console.log('spy');
  return jest.fn().mockImplementation(() => {
    return {
      getAll: mockGetAll,
      getSingle: mockGetSingle,
      update: mockUpdate,
      create: mockCreate,
      delete: mockDelete,
    };
  });
});

describe('test for src/services/characterService.js', () => {
  let service;
  let schema;
  let size;
  beforeEach(() => {
    service = new CharacterService();
    schema = CharactersSchema;
    jest.clearAllMocks();
  });
  describe('getCharacters()', () => {
    test('should return a list of characters', async () => {
      size = 10;
      let fakeCharacters = generateManyCharacters(size);
      mockGetAll.mockResolvedValue(fakeCharacters);
      const characters = await service.getCharacters(schema);
      expect(characters.length).toEqual(size);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledWith(schema);
      expect(mockGetAll).toHaveBeenCalledTimes(1);
    });
  });
  describe('getCharacter()', () => {
    test('should return a character', async () => {
      let id = characterMutable[0].id;
      mockGetSingle.mockResolvedValue(characterMutable[0]);
      const character = await service.getCharacter(schema, id);
      // console.log(id);
      // console.log(fakeCharacters);
      expect(character.id).toEqual(id);
      expect(mockGetSingle).toHaveBeenCalled();
    });
  });
  describe('updateCharacter()', () => {
    test('should update a character', async () => {
      let id = characterMutable[0].id;
      let newData = { id: '9812794871', name: 'new name' };
      mockUpdate.mockResolvedValue(newData);
      const updateCharacter = await service.updateCharacter(
        schema,
        id,
        newData,
      );
      expect(updateCharacter.name).toEqual(newData.name);
      expect(mockUpdate).toHaveBeenCalled();
      expect(mockUpdate).toHaveBeenCalledWith(schema, id, newData);
    });
  });
  describe('createCharacter()', () => {
    test('should create a character', async () => {
      let newData = { id: '9812794871', name: 'new name' };
      mockCreate.mockResolvedValue(newData);
      const createCharacter = await service.createCharacter(schema, newData);
      expect(createCharacter.name).toEqual(newData.name);
      expect(mockCreate).toHaveBeenCalled();
      expect(mockCreate).toHaveBeenCalledWith(schema, newData);
    });
  });
  describe('deleteCharacter()', () => {
    test('should delete a character', async () => {
      let id = characterMutable[0].id;
      mockDelete.mockResolvedValue(true);
      const deleteCharacter = await service.deleteCharacter(schema, id);
      expect(deleteCharacter).toEqual(true);
      expect(mockDelete).toHaveBeenCalled();
      expect(mockDelete).toHaveBeenCalledWith(schema, id);
    });
  });
});
