const request = require('supertest');
require('dotenv').config();
const createApp = require('../app');
const { dbConnection } = require('./helpers/mongooseConnect');
const { voidCollection, findElement } = require('./helpers/mongooseReset');
const { User } = require('../schemas/userSchema');
const UserService = require('../services/userService');
const tokenTest = require('./helpers/tokenTest');
const generateInvitationToken = require('../controllers/invitation');
const userService = new UserService();

const testUser = {
  username: 'myTestUser',
  email: 'thetesttraveler@gmail.com',
  password: '123test',
  roles: 'admin',
};

describe('test for src/routes/authRoute', () => {
  let app;
  let server;
  beforeAll(async () => {
    dbConnection();
    app = await createApp();
    server = app.listen(2077);
  });
  beforeEach(async () => {
    await voidCollection(User);
  });
  afterAll(async () => {
    await server.close();
  });
  test('should return a message', async () => {
    return request(server)
      .get('/api/v1/auth/')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Hello');
      });
  });
  test('test for /register post', async () => {
    const invitedUser = {
      userId: 'pepitoclavounclavito2711',
      roles: 'invited',
    };
    const token = await generateInvitationToken(invitedUser);
    return request(app)
      .post('/api/v1/auth/register')
      .set('Authorization', `bearer ${token}`)
      .send(testUser)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toBe('User created successfully');
      });
  });
  test('test for /register delete', async () => {
    await userService.createUser(testUser);
    const element = await findElement(User, testUser.username);
    const id = element._id;
    const token = await tokenTest();
    return request(app)
      .delete(`/api/v1/auth/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('User deleted');
      });
  });
  test('test for /register update', async () => {
    await userService.createUser(testUser);
    const element = await findElement(User, testUser.username);
    const id = await element._id;
    const token = await tokenTest();
    return request(app)
      .patch(`/api/v1/auth/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        username: 'updateUser',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.username).toBe('updateUser');
      });
  });
  test('test for /login post', async () => {
    await userService.createUser(testUser);
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: testUser.username,
        password: testUser.password,
      })
      .expect(200)
      .then(() => {
        expect.objectContaining({
          username: testUser.username,
          token: expect.any(String),
        });
      });
  });
  test('test for /invitation get', async () => {
    await userService.createUser(testUser);
    const token = await tokenTest();
    return request(app)
      .post('/api/v1/auth/invitation')
      .set('Authorization', `bearer ${token}`)
      .send({
        userId: '5e9b9b9b9b9b9b9b9b9b9b9',
        roles: 'invited',
      })
      .expect(201)
      .then(() => {
        expect.objectContaining({
          message: 'Invitation token generated',
          token: expect.any(String),
        });
      });
  });
  test('test failed for /register post', async () => {
    const token = 'asdasdasdadas';
    return request(app)
      .post('/api/v1/auth/register')
      .set('Authorization', `bearer ${token}`)
      .send(testUser)
      .expect(401)
      .then((response) => {
        expect(response.body.error).toBe('token is not valid');
      });
  });
  test('test failed for /register delete', async () => {
    await userService.createUser(testUser);
    const element = await findElement(User, testUser.username);
    const id = await element._id;
    const token = 'tututuutututututu';
    return request(app)
      .delete(`/api/v1/auth/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(401)
      .then((response) => {
        expect(response.body.error).toBe('token is not valid');
      });
  });
  test('test failed for /register update', async () => {
    await userService.createUser(testUser);
    const element = await findElement(User, testUser.username);
    const id = await element._id;
    const token = 'tututuutututututu';
    return request(app)
      .patch(`/api/v1/auth/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        username: 'updateUser',
      })
      .expect(401)
      .then((response) => {
        expect(response.body.error).toBe('token is not valid');
      });
  });
  test('test failed for /login post', async () => {
    await userService.createUser(testUser);
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: testUser.username,
        password: 'badpassword',
      })
      .expect(401)
      .then((response) => {
        expect(response.body.error).toBe('Invalid username or password');
      });
  });
  test('test failed for /invitation get', async () => {
    await userService.createUser(testUser);
    const token = 'tututuutututututu';
    return request(app)
      .post('/api/v1/auth/invitation')
      .set('Authorization', `bearer ${token}`)
      .send({
        userId: '5e9b9b9b9b9b9b9b9b9b9b9',
        roles: 'invited',
      })
      .expect(401)
      .then((response) => {
        expect(response.body.error).toBe('token is not valid');
      });
  });
});
