const router = require('express').Router();
const { body, check } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');
const isAuth = require('../middleware/is-auth');

router.post('/signUp',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value }}).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        })
      }),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter password greater than 5 characters.'),
    body('firstName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid first name.'),
    body('lastName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid last name.')
  ]
, authController.signUp);

router.post('/signIn', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({ where: { email: value }}).then(userDoc => {
        if (userDoc) {
          return Promise.reject('E-Mail address already exists!');
        }
      })
    }),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please enter password greater than 5 characters.')], 
    authController.signIn);

    
module.exports = router;
