const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = require('http').Server(app);


const router = express.Router();
const bodyParser = require('body-parser');
const { subscriptionPost, loginPost } = require('./controler/requestHandler.js');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use('/', router);

app.post('/subscription', subscriptionPost);
app.post('/login', loginPost);


const wss = new WebSocket.Server({ port: 8989 });

const users = [];

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  let index;
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'ADD_USER': {
        index = users.length;
        users.push({ name: data.name, id: index + 1 });
        ws.send(JSON.stringify({
          type: 'USERS_LIST',
          users,
        }));
        broadcast({
          type: 'USERS_LIST',
          users,
        }, ws);
        break;
      }
      case 'ADD_MESSAGE':
        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author,
        }, ws);
        break;
      default:
        break;
    }
  });

  ws.on('close', () => {
    users.splice(index, 1);
    broadcast({
      type: 'USERS_LIST',
      users,
    }, ws);
  });
});

server.listen(8888);

module.exports = {
  app,
};
