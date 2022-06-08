const createApp = require('../app');
require('dotenv').config();
const supertest = require('supertest');
const { dbConnection } = require('./helpers/mongooseConnect');
const jwt = require('jsonwebtoken');
const { generateCharacter } = require('../faker/fakerCharacters');
const {
  findElement,
  voidCollection,
  addElement,
} = require('./helpers/mongooseReset');
const testUser = require('../faker/fakerUser');
const { User } = require('../schemas/userSchema');
const UserService = require('../services/userService');
const Character = require('../schemas/charactersSchema');
const userService = new UserService();

describe('test for the connection and endpoints of characters', () => {
  let app;
  let server;
  let api;
  let token;
  beforeAll(async () => {
    await dbConnection();
    await voidCollection(User);
    await voidCollection(Character);
    app = await createApp();
    server = app.listen(2077);
    api = supertest(app);
    await userService.createUser(testUser);
    const userFinder = await findElement(User, testUser.username);
    const userForToken = {
      username: userFinder.username,
      id: userFinder._id,
    };
    process.env.SECRET = 'Jägermeister';
    token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: '60s',
    });
  });
  afterAll(async () => {
    await server.close();
  });
  test('test for the get', async () => {
    const character = generateCharacter();
    await addElement(Character, character);
    return api
      .get('/api/v1/characters')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe(character.name);
      });
  });
  test('test for the post', async () => {
    const character = generateCharacter();
    return api
      .post('/api/v1/characters')
      .set('Authorization', `bearer ${token}`)
      .send(character)
      .expect(201)
      .then(() => {
        expect.objectContaining({
          message: 'Character created',
          name: character.name,
        });
      });
  });
  test('test for update', async () => {
    const character = generateCharacter();
    await addElement(Character, character);
    const characterFinder = await findElement(Character, character.name);
    const characterId = characterFinder._id;
    const updateCharacter = {
      name: 'updated name',
    };
    return api
      .patch(`/api/v1/characters/${characterId}`)
      .send(updateCharacter)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .then(() => {
        expect.objectContaining({
          message: 'Character updated',
          name: updateCharacter.name,
        });
      });
  });
  test('test for delete', async () => {
    const character = generateCharacter();
    await addElement(Character, character);
    const characterFinder = await findElement(Character, character.name);
    const characterId = characterFinder._id;
    return api
      .delete(`/api/v1/characters/${characterId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Character deleted');
      });
  });
  test('test for get with id', async () => {
    const character = generateCharacter();
    await addElement(Character, character);
    const characterFinder = await findElement(Character, character.name);
    const characterId = characterFinder._id;
    return api
      .get(`/api/v1/characters/${characterId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe(character.name);
      });
  });
  test('test for get with id not found', async () => {
    const character = generateCharacter();
    await addElement(Character, character);
    const characterId = '1010101202983';
    return api
      .get(`/api/v1/characters/${characterId}`)
      .expect(404)
      .then(() => {
        expect.objectContaining({
          error: 'id used is invalid',
        });
      });
  });
  test('test for failed post', () => {
    const character = generateCharacter();
    const badToken = '1010101202983';
    return api
      .post('/api/v1/characters')
      .set('Authorization', `bearer ${badToken}`)
      .send(character)
      .expect(401)
      .then(() => {
        expect.objectContaining({
          error: 'token is invalid',
        });
      });
  });
  test('test for failed update', async () => {
    const character = generateCharacter();
    return api
      .patch('/api/v1/characters/1010101202983')
      .send(character)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
      .then(() => {
        expect.objectContaining({
          error: 'id used is invalid',
        });
      });
  });
  test('test for failed delete', async () => {
    return api
      .delete('/api/v1/characters/1010101202983')
      .set('Authorization', `bearer ${token}`)
      .expect(404);
  });
});
