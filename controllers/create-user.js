const User = require('../models/user');

module.exports = async (req, res) => {
  let newUser = new User({
    login: req.body.login,
    password: req.body.password,
    access: req.body.access
  });
  const { login } = req.body
  const user = await User.findOne({ login });
  const authorizedUserAccess = req.user.access;

  if(user){
    res.json({success: false, msg: 'Such user already exists'})
  }

  if(authorizedUserAccess == 'root'){
    await newUser.save();
    res.json({success: true, msg: "Registered", newUser});
  } else {
    res.json({success: false, msg: 'Failes to register user. You dont have access to this action! '});
  }
};

/* 
router.post('/register', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  let newUser = new User({
    login: req.body.login,
    password: req.body.password,
    access: req.body.access
  });
  
  const authorizedUserAccess = req.user.access;
  if(authorizedUserAccess == 'root'){
    User.addUser(newUser, (err, user) => {
      if(err){
        res.json({success: false, msg: 'Failes to register user'});
      } else {
        res.json({success: true, msg: "Registered", newUser});
      }
    });
  } else {
    res.json({success: false, msg: 'You dont have access to this action!'});
  }
});
 */
