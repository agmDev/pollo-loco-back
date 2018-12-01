const Sequelize = require('sequelize');
// const User = require('./../db/models/user.js');

const sequelize = new Sequelize('pollo_loco', 'root', 'password', {
  host: '127.0.0.1',
  dialect: 'mysql',
  dialectOptions: {
    requestTimeout: 150000,
  },
  operatorsAliases: false,
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

const createUser = async (username, password) => User.sync()
  .then(() => {
    User.create({ username, password });
  });

const getUser = async (username, password) => User.find({ username, password });

module.exports = {
  createUser,
  getUser,
};
