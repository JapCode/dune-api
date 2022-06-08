const jwt = require('jsonwebtoken');
const userExtractor = require('../middleware/userExtractor');

const mockStatus = jest.fn();
const mockJson = jest.fn();
const mockNext = jest.fn();

describe('test for src/middleware/userExtractor.js', () => {
  let token;
  const userForToken = {
    username: 'test user',
    id: '123',
  };
  beforeAll(() => {
    process.env.SECRET = 'jaegermeister';
    token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: '60s',
    });
  });
  test('should return a next route or middleware', async () => {
    const req = {
      get: jest.fn().mockReturnValue(`Bearer ${token}`),
    };
    const res = {
      status: mockStatus,
    };
    const next = mockNext;
    await userExtractor(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  test('should return a 401 token is not valid', async () => {
    // mockJson.mockReturnValue({
    //   error: 'token is not valid',
    // });
    mockStatus.mockReturnValue({
      json: mockJson,
    });
    let invalidToken = 'invalid token';
    const req = {
      get: jest.fn().mockReturnValue(`Bearer ${invalidToken}`),
    };
    const res = {
      status: mockStatus,
      json: mockJson,
    };
    const next = jest.fn();
    await userExtractor(req, res, next);
    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      error: 'token is not valid',
    });
    expect(next).toHaveBeenCalledTimes(0);
  });
});
