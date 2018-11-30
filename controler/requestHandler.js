const { createUser, getUser } = require('../model/model.js');

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
    console.log(err);
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
