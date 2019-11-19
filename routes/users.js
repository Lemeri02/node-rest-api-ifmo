const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/register', (req, res, next) => {
  let newUser = new User({
    login: req.body.login,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failes to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;

  User.getUserByUsername(login, (err, user) => {
    console.log(login, user)
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      console.log(password, user.password, isMatch)
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'JWT '+ token,
          user: {
            _id: user._id,
            login: user.login,
            password: user.password
          }
        });
      } else{
        return res.json({success: false, msg: 'Wrong Password'});
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user})
});


module.exports = router;
