const Seq = require('sequelize');
const Validate = require('./../../utils/validate.js');
const config = require('../../config/database');

// console.log('type of Validate ', typeof Validate);
console.log(`Type of validate ${typeof validate}`);
const val = new Validate();

const sequelize = new Seq(
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

const User = sequelize.define('User', {
  username: {
    type: Seq.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    validate: { is: val.get('username') },
  },
  password: {
    type: Seq.STRING,
    allowNull: false,
    validate: { is: val.get('password') },
  },
});

const createUser = async (username, password) => User.sync()
  .then(() => {
    User.create({ username, password });
  });

const getUser = async (username, password) => User.find({ username, password });

module.exports = {
  createUser,
  getUser,
  sequelize,
};
