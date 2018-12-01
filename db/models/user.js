const Sequelize = require('sequelize');
const Validate = require('./../../utils/validate.js');

// console.log('type of Validate ', typeof Validate);
console.log(`Type of validate ${typeof validate}`);
const User = Sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    validate: { is: Validate.get('username') },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { is: Validate.get('password') },
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
