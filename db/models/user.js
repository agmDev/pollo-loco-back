const Seq = require('sequelize');
const Validate = require('./../../utils/validate.js');
const config = require('../../config/database');

// console.log('type of Validate ', typeof Validate);
console.log(`Type of validate ${typeof validate}`);
const val = new Validate();
const Sequelize = new Seq(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  dialect: config.mysql.dialect,
  port: config.mysql.port,
});
const User = Sequelize.define('User', {
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
};
