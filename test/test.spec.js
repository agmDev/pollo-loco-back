const request = require('supertest');
const io = require('socket.io-client');
const { app } = require('../server.js');

describe('/post subscription', () => {
  const userInformation = {
    username: 'admin',
    password: 'password',
  };
  test('Check the status code and the message', async () => {
    await request(app)
      .post('/subscription')
      .send(userInformation)
      .set('Accept', 'application/json')
      .expect(200);
  });
});

describe('/post login', () => {
  const userInformation = {
    username: 'admin',
    password: 'admin',
  };
  test('Check the status code and the message', async () => {
    await request(app)
      .post('/login')
      .send(userInformation)
      .set('Accept', 'application/json')
      .expect(200);
  });
});

describe('/post login', () => {
  const userInformation = {
    username: 'azertyuiop',
    password: 'azertyuiop',
  };
  test('Check the status code and the message', async () => {
    await request(app)
      .post('/login')
      .send(userInformation)
      .set('Accept', 'application/json')
      .expect(401);
  });
});

describe('connectionn general', () => {
  const messageUsersList = {
    type: 'ADD_USER',
    name: 'Steven',
  };
  const messageAddMessage = {
    type: 'ADD_MESSAGE',
    message: 'This is a message',
    author: 'Jesus',
  };
  let client;
  beforeAll(async () => {
    client = await io.connect('http://localhost:8888/general');
  });
  test('Check USERS_LIST', async () => {
    client.emit('message', messageUsersList);
    client.on('USERS_LIST', (data) => {
      expect(data[0].name).toBe('Steven');
    });
  });
  test('Check ADD_MESSAGE', () => {
    client.emit('message', messageAddMessage);
    client.on('ADD_MESSAGE', (data) => {
      expect(data.message).toBe('This is a message');
      expect(data.author).toBe('Jesus');
    });
  });
});
