const User = require('../models/user');

module.exports = async (req, res) => {
  const user = await User.find()
  
  if(user){
    res.json({success: true, users: user})
  } else {
    return res.json({success: false, msg: 'User not found'});
  }
};
