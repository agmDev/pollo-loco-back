const mongoose = require('mongoose');
const User = require('./userSchema.js');

mongoose.connect('mongodb://pollo-loco:pollo-loco07@ds155663.mlab.com:55663/pollo-roco');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('[MONGOOSE] ... Connection to database success !');
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
