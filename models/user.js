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
}

module.exports.getUserByUsername = function(login, callback){
  const query = { login: login}
  User.findOne(query, callback);
  console.log(query)
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.hash(candidatePassword, salt, function(err, hash){
     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
    console.log('comparePassword', candidatePassword, isMatch, hash )
  });
  })
 
} 


/* module.exports.comparePassword = function(candidatePassword, hash, callback){
  
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
    console.log('comparePassword', candidatePassword, isMatch, hash )
  });
} 
 */
