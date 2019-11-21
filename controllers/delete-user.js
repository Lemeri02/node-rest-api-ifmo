const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { login } = req.params;
  const authorizedUserAccess = req.user.access;
  const user = await User.findOne({ login });

  if(authorizedUserAccess == 'root' && user.access != 'root'){
    await User.deleteOne({ login });
    res.json({result: login, success: true, msg: 'User was delete: ' + login})
  } else {
    return res.json({success: false, msg: `You can't delete a user ${login} or User not found`});
  }
};

/* router.delete('/:login', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const { login } = req.params;
  const authorizedUserAccess = req.user.access;
  User.getUserByUsername(login, (err, user) => {
    if(authorizedUserAccess == 'root' && user.access != 'root'){
      User.deleteUser(login, (err, delUser) => {
      if(err) throw err;
      if(delUser){
        res.json({result: delUser, success: true, msg: 'User was delete: ' + login})
      } else {
          return res.json({success: false, msg: 'User not found'});
        }
      })
    } else {
      return res.json({success: false, msg: `You can't delete a user ${login}`});
    }
  });
}); */
