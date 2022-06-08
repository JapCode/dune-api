const mockGetAll = jest.fn();
const jwt = require('jsonwebtoken');
const request = require('supertest');
const createApp = require('../app');
const Character = require('../schemas/charactersSchema');
const Schema = require('mongoose').Schema;
const mockingoose = require('mockingoose');

const { generateManyCharacters } = require('../faker/fakerCharacters');

// const generateObjectId = () => {
//   return new Schema.Types.ObjectId();
// };
// const userTest = {
//   username: 'grey',
//   email: 'caeramylove@gmail.com',
//   password: '123456',
//   roles: ['admin'],
//   characters: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Character',
//     },
//   ],
// };

jest.mock('../lib/mongoLib.js', () => {
  console.log('spy');
  return jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    getAll: mockGetAll,
    create: jest.fn(),
  }));
});

describe('test for characters', () => {
  let token;
  const userForToken = {
    username: 'grey',
    id: '123',
  };
  let app;
  let server;
  beforeAll(async () => {
    process.env.SECRET = 'jaegermeister';
    token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: '60s',
    });
    app = createApp();
    server = app.listen(2077);
  });
  afterAll(async () => {
    await server.close();
  });
  describe('for [GET] /api/v1/characters', () => {
    test('should return a list of characters', () => {
      // Arrange
      const size = 2;
      const fakerCharacters = generateManyCharacters(size);
      mockGetAll.mockResolvedValue(fakerCharacters);
      mockingoose(Character).toReturn(mockGetAll);
      // Act
      return request(app)
        .get('/api/v1/characters')
        .expect(200)
        .then(({ body }) => {
          // Assert
          console.log(body);
          expect(body.length).toEqual(size);
        });
    });
    test('unauthorized post a characters', () => {
      // Arrange
      const character = {
        name: 'test',
        title: 'test',
        faction: 'test',
        house: 'test',
        species: 'test',
        planet: 'test',
        status: 'test',
        image: 'test',
        user: 'test',
      };
      // Act
      return request(app)
        .post('/api/v1/characters')
        .send(character)
        .expect(401)
        .then((res) => {
          // Assert
          expect(res.body).toEqual({
            error: 'token is not valid',
          });
        });
    });
    test('create a character', () => {
      // Arrange
      const character = {
        name: 'test',
        title: 'test',
        faction: 'test',
        house: 'test',
        species: 'test',
        planet: 'test',
        status: 'test',
        image: 'test',
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      };
      mockingoose(Character).toReturn(character, 'update');
      Character.create = jest.fn();
      // Act
      return request(app)
        .post('/api/v1/characters')
        .set('Authorization', `Bearer ${token}`)
        .send(character)
        .expect(201);
    });
  });
});
