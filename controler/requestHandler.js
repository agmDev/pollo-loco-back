const Sequelize = require('sequelize');
const config = require('../config/database');
const { createUser, getUser } = require('../db/models/user.js');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const subscriptionPost = async (req, res) => {
  const {
    body: {
      username, password,
    },
  } = req;
  try {
    await createUser(username, password);
    res.status(200).send('subscription success');
  } catch (err) {
    res.status(400).send('subscription failed');
  }
};

const loginPost = async (req, res) => {
  const {
    body: {
      username, password,
    },
  } = req;
  try {
    await getUser(username, password);
    res.status(200).send('subscription success');
  } catch (err) {
    res.status(401).send('login failed');
  }
};

module.exports = {
  subscriptionPost,
  loginPost,
};
