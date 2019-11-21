const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();

module.exports.getUserByPassword = async function(password, callback){
  const query = { password: password}
  await User.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.hash(candidatePassword, salt, function(err, hash){
     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
  });
};
