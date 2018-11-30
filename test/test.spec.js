const request = require('supertest');
const io = require('socket.io-client');
const { app } = require('../server.js');

// describe('/post subscription', () => {
//   const userInformation = {
//     name: 'admin',
//     lastname: 'admin',
//     username: 'admin',
//     email: 'admin@admin.com',
//     password: 'password',
//     confirmationPassword: 'password',
//   };
//   test('Check the status code and the message', async () => {
//     await request(app)
//       .post('/subscription')
//       .send(userInformation)
//       .set('Accept', 'application/json')
//       .expect(200);
//   });
// });

// describe('/post login', () => {
//   const userInformation = {
//     username: 'admin',
//     password: 'admin',
//   };
//   test('Check the status code and the message', async () => {
//     await request(app)
//       .post('/login')
//       .send(userInformation)
//       .set('Accept', 'application/json')
//       .expect(200);
//   });
// });

describe('connectionn general', () => {
  const message = {
    type: 'ADD_USER',
    name: 'Steven',
  };
  test('Check if connection to /general work', async (done) => {
    // const client = await io.connect('http://localhost:8888/general', { query: { message } });
    const client = await io.connect('http://localhost:8888/general');
    client.emit('message', message);
    client.on('USERS_LIST', (data) => {
      expect(data[0].name).toBe('Steven');
      done();
    });
  });
});

