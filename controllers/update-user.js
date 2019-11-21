const User = require('../models/user');



module.exports = async (req, res, next) => {
  const { login } = req.params;
  const authorizedUserAccess = req.user.access;
  const user = await User.findOne({ login });

  let password = "";
  let access = "";
  if(user){
    if(req.body.password){
    password = req.body.password;
    } else {
      password = user.password
    };
    
    if(req.body.access){
      access = req.body.access;
    } else {
      access = user.access
    };
  }
  
  if(user && authorizedUserAccess == 'root'){
    user.password = password;
    user.access = access;
    await user.save();
    res.json({success: true, user});
  } else {
    return res.json({success: false, msg: 'User not found'});
  } 
};
