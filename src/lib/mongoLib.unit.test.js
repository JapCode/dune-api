// const mockGetAll = jest.fn();
// const mockDisconnect = jest.fn();
// const MongoLib = require('../lib/mongoLib');
// const mongoose = require('mongoose');
// const mockingoose = require('mockingoose');
// const Character = require('../schemas/charactersSchema');
// const { connect, connection, model, Schema } = require('../__mocks__/mongoose');
// const mockConnect = connect;
// const mockConnection = connection;
// const mockModel = model;
// const mockSchema = Schema;

// const fakeCharacters = [
//   {
//     name: 'John Doe',
//     title: 'none',
//     factions: 'none',
//     house: 'none',
//     species: 'none',
//     planet: 'none',
//     status: 'undefined',
//     image: 'undefined',
//     user: '5e9f8f8f8f8f8f8f8f8f8f8',
//   },
//   {
//     name: 'Johnwdeq Doe',
//     title: 'nonasdae',
//     factions: 'nasdasdone',
//     house: 'noasdne',
//     species: 'noasdne',
//     planet: 'noasdne',
//     status: 'unasdefined',
//     image: 'undefasined',
//     user: '5e9f8f8f8f8f8f8f8f8f8f8',
//   },
// ];
// jest.mock('../lib/mongoLib', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       connect: mockConnect,
//       getAll: mockGetAll,
//       // disconnect: mockDisconnect,
//     };
//   });
// });

// describe('test mongoLib', () => {
//   jest.mock('mongoose', () => {
//     return {
//       connect: mockConnect,
//       connection: mockConnection,
//       model: mockModel,
//       Schema: mockSchema,
//     };
//   });
//   let mongoLibInstance;
//   beforeAll(async () => {
//     mongoLibInstance = new MongoLib();
//     await mongoLibInstance.connect();
//   });
//   test('test mongoLib', async () => {
//     mockModel.mockImplementation(() => {
//       return {
//         find: jest.fn().mockReturnValue(fakeCharacters),
//         findById: jest.fn(),
//         create: jest.fn(),
//         update: jest.fn(),
//         delete: jest.fn(),
//       };
//     });
//     mockConnect.mockReturnValue(
//       Promise.resolve({
//         model: mockModel,
//       }),
//     );
//     mockConnection;
//     console.log(connection);
//     const result = await mongoLibInstance.getAll('characters');
//     expect(result).toEqual(fakeCharacters);
//   });
// test('test mongoLib getAll', async () => {
//   // mockingoose(CharactersSchema).toReturn({
//   //   name: 'test',
//   // });
//   const result = await mongoLibInstance.getAll(CharactersSchema);
//   expect(result).toEqual({
//     name: 'test',
//   });
// });
// });
