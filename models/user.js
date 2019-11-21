const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const salt = bcrypt.genSaltSync();

const UserSchema = new mongoose.Schema({
    "login": {
      "type": "String"
    },
    "password": {
      "type": "String"
    }, 
    "access": {
      "type": "String"
    }
  },
);

const User = module.exports = mongoose.model('User', UserSchema);

/* module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}; */

/* module.exports.getUserByUsername = function(login, callback){
  const query = { login: login}
  User.findOne(query, callback);
};
 */
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
/* module.exports.deleteUser = async function(login, callback){
  const query = { login: login}
  console.log('---deleteUser', query)
  await User.deleteOne(query, callback);
};
  */
/* module.exports.getUsers = async function(login, callback){
  await User.find(callback);
}; */

/* module.exports.updateUser = function(updatedUser, callback){
  updatedUser.save(callback);
}; */

/* module.exports.addUser = function(newUser, callback){
      newUser.save(callback);
}; */
