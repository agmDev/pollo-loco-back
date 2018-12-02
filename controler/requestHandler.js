const { createUser, getUser } = require('../db/models/user.js');

const subscriptionPost = async (req, res) => {
  console.log(req.body);
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
    res.status(200).send('login success');
  } catch (err) {
    res.status(401).send('login failed');
  }
};

module.exports = {
  subscriptionPost,
  loginPost,
};
