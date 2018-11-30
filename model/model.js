const Sequelize = require('sequelize');
const User = require('./userSchema.js');

const sequelize = new Sequelize('pollo_loco', 'root', 'root', {
  host: '172.20.0.3',
  dialect: 'mysql',
  operatorsAliases: false,
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const createUser = async (name, lastname, username, email, password) => {
  const newUser = new User({
    name,
    lastname,
    email,
    username,
    password,
  });
  return newUser.save();
};

const getUser = async (username, password) => User.find({ username, password });

module.exports = {
  createUser,
  getUser,
};
