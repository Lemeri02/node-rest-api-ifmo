const User = require('../models/user');

module.exports = async (req, res, next) => {
  res.json({msg: `You are authorized like: ${req.user.login}`, success: true, user: req.user})
};
