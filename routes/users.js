const express = require('express');
const router = express.Router();
const passport = require('passport');


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


module.exports = router;
