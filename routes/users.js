const express = require('express');
const router = express.Router();
//const User = require('../models/user');
const passport = require('passport');
//const jwt = require('jsonwebtoken');
//const config = require('../config/database');


//AUTHENTICATE
/* router.post('/authenticate', (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;

  User.getUserByUsername(login, (err, user) => {
    if(err) throw err;
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
  });
}); */


//LOG IN
/* router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({msg: `You are authorized like: ${req.user.login}`, success: true, user: req.user})
}); */

const getUser = require('../controllers/get-user');
const deleteUser = require('../controllers/delete-user');
const updateUser = require('../controllers/update-user');
const getAllUsers = require('../controllers/get-users');
const createUser = require('../controllers/create-user');
const profileUser = require('../controllers/profile-user');
const authenticateUser = require('../controllers/auth-user');


router
  .route('/authenticate')
  .post(authenticateUser);

router
  .route('/profile')
  .get(passport.authenticate('jwt', {session: false}), profileUser);

router
  .route('/:login')
  .get(getUser)
  .delete(passport.authenticate('jwt', {session: false}), deleteUser)
  .put(passport.authenticate('jwt', {session: false}), updateUser);

router
  .route('/')
  .get(getAllUsers);

router
  .route('/register')
  .post(passport.authenticate('jwt', {session: false}), createUser);


//CREATE
/* router.post('/register', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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
}); */

// READ ALL
/* router.get('/', (req, res, next) => {
  User.getUsers(req, (err, user) => {
   if(err) throw err;
   if(user){
     res.json(user)
   } else{
       return res.json({success: false, msg: 'User not found'});
     }
 });
}); */
 

  //console.log(deleteUser)

/* router.get('/:login', async (req, res, next) => {
 const { login } = req.params;

 User.getUser(login, (err, user) => {
   if(err) throw err;
   if(user){
     res.json(user)
   } else{
       return res.json({success: false, msg: 'User not found'});
     }
 });
}); */

// UPDATE
/* router.put('/:login', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const { login } = req.params;
  const { password } = req.body;
  const authorizedUserAccess = req.user.access;

  User.getUserByUsername(login, (err, user) => {
    if(user && authorizedUserAccess == 'root'){
      user.password = password;
      User.updateUser(user, (er, updatedUser) =>{
        res.json({success: true, updatedUser});
      })
    } else {
      return res.json({success: false, msg: 'User not found'});
    }
  });
}) */

//DELETE
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




module.exports = router;
