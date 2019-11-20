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

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(login, callback){
  const query = { login: login}
  User.findOne(query, callback);
};

module.exports.getUserByPassword = function(password, callback){
  const query = { password: password}
  User.findOne(query, callback);
};

module.exports.deleteUser = function(login, callback){
  const query = { login: login}
  User.deleteOne(query, callback);
};
 
module.exports.getUsers = function(login, callback){
  User.find(callback);
};

module.exports.updateUser = function(updatedUser, callback){
  updatedUser.save(callback);
};

module.exports.addUser = function(newUser, callback){
      newUser.save(callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.hash(candidatePassword, salt, function(err, hash){
     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
  });
};
