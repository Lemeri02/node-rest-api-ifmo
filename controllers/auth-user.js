const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


module.exports = async (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;
  const user = await User.findOne({ login });

  if(!user){
    return res.json({success: false, msg: 'User not found'});
  }
  User.comparePassword(password, user.password, (err, isMatch) => {
    if(err) throw err;
    if(password == user.password){
      const token = jwt.sign({user: password}, config.secret, {
        expiresIn: 604800
      });

      res.json({
        success: true,
        token: 'JWT '+ token,
        user: {
          _id: user._id,
          login: user.login,
          password: user.password,
          access: user.access
        }
      });
    } else{
      return res.json({success: false, msg: 'Wrong Password'});
    }
  });  
};
