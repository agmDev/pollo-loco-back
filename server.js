const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const router = express.Router();
const bodyParser = require('body-parser');
const { subscriptionPost, loginPost } = require('./controler/requestHandler.js');


const general = io.of('/general');

const users = [];
// const channelOne = io.of('/channelOne');
// const channelTwo = io.of('/channelTwo');
// const channelThree = io.of('/channelThree');

// io.use((socket, next) => {

// });

//-----------------

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.post('/subscription', subscriptionPost);
app.post('/login', loginPost);

general.on('connection', (socket) => {
  socket
    .join('/general', () => {
      general.to('/general').emit('newUser', `${socket.handshake.query.poupoune} has been connected`);
    })
    .on('message', (data) => {
      const {
        type, name, message, author,
      } = data;
      if (type === 'ADD_USER') {
        const index = users.length;
        const user = {
          name,
          index,
        };
        users.push(user);
        general.to('/general').emit('USERS_LIST', users);
      }
      const response = {
        message,
        author,
      };
      if (type === 'ADD_MESSAGE') {
        general.to('/general').emit('ADD_MESSAGE', response);
      }
    });
});

server.listen(8888);

module.exports = {
  app,
};

// general.on('message', (socket1) => {
//   console.log('Message');
//   const {
//     handshake: {
//       query: {
//         message: {
//           type, name,
//         },
//       },
//     },
//   } = socket1;
//   if (type === 'ADD_USER') {
//     const index = users.length;
//     const user = { //demander a Hugo
//       name,
//       index,
//     };
//     console.log('Before the emit');
//     users.push(user);
//     general.to('/general').emit('USERS_LIST', users);
//   }
// });

// .on('deconnection', (socket) => {
//     console.log('User has been disconnected from the general channel');
//     socket.leave('general', () => {
//         socket.to('general').emit('disconnect', `${socket.id} has been disconnected`)
//     })
// });

// if (process.env.NODE_ENV === 'production') {
//   server.listen(8888);
// }

// channelOne
// .on('connection', (socket) => {
//     console.log('User has been connected to the channel one');
//     socket.join('channelOne', () => {
//         socket.to('channelOne').emit('newUser', `${socket.id} has been connected`)
//     })
// })
// .on('deconnection', (socket) => {
//     console.log('User has been disconnected from the channel one');
//     socket.leave('channelOne', () => {
//         socket.to('channelOne').emit('disconnect', `${socket.id} has been disconnected`)
//     })
// })

// channelTwo
// .on('connection', (socket) => {
//     console.log('User has been connected to the chanel two');
//     socket.join('channelTwo', () => {
//         socket.to('channelTwo').emit('newUser', `${socket.id} has been connected`)
//     })
// })
// .on('deconnection', (socket) => {
//     console.log('User has been disconnected from the channel two');
//     socket.leave('channelTwo', () => {
//         socket.to('channelTwo').emit('disconnect', `${socket.id} has been disconnected`)
//     })
// })

// channelThree
// .on('connection', (socket) => {
//     console.log('User has been connected to the chanel three');
//     socket.join('channelThree', () => {
//         socket.to('channelThree').emit('newUser', `${socket.id} has been connected`)
//     })
// })
// .on('deconnection', (socket) => {
//     console.log('User has been disconnected from the channel three');
//     socket.leave('channelThree', () => {
//         socket.to('channelThree').emit('disconnect', `${socket.id} has been disconnected`)
//     })
// })

// io.on('connection', function (socket) {
//     console.log('User has been connected normally')
// });
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const http = require('http');

// // const app = express();
// // const server = http.createServer(app);
// // const port = process.env.PORT || 8888;

// // const io = require('socket.io')(server);

// // const routes = require('./routes/routes.js');

// // // io.path('/general');

// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());
// // app.use('/', routes);

// // const nsp = io.of('/general');
// // nsp.on('connection', (socket) => {
// //   console.log('User has been connected to general');
// //   nsp.emit('welcome', 'welcome to the channel');
// // });

// // server.listen(port, () => {
// //   console.log(`Server running on ${port}`);
// // });

// // module.exports = {
// //   app,
// //   io,
// // };

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res) {
//    res.sendfile('index.html');
// });

// var nsp = io.of('/general');
// nsp.on('connection', function(socket) {
//    console.log('someone connected');
//    nsp.emit('hi', 'Hello everyone!');
// });

// http.listen(8888, function() {
//    console.log('listening on localhost:8888');
// });

// // const app = require('express.io')();
// // const bodyParser = require('body-parser');
// // const { createUser, getUser } = require('./model/model.js');

// // const port = process.env.PORT || 8888;

// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());
// // // app.use('/', routes);
// // // app.io.route('/');
// // app.http().io();


// // app.post('/subscription', async (req, res) => {
// //   const {
// //     body: {
// //       name, lastname, username, email, password,
// //     },
// //   } = req;
// //   try {
// //     await createUser(name, lastname, username, email, password);
// //     res.status(200).send('subscription success');
// //   } catch (err) {
// //     res.status(400).send('subscription failed');
// //     console.log(err);
// //   }
// // });

// // app.post('/login', async (req, res) => {
// //   const {
// //     body: {
// //       username, password,
// //     },
// //   } = req;
// //   try {
// //     await getUser(username, password);
// //     res.status(200).send('subscription success');
// //   } catch (err) {
// //     res.status(401).send('login failed');
// //   }
// // });

// // app.get('/general', (req) => {
// //   console.log('app.get /general');
// //   req.io.route('general');
// // });

// // app.io.route('general', async () => {
// //   console.log('Inside the general app.io.route');
// // });

// // app.listen(port);

// // module.exports = {
// //   app,
// // };
