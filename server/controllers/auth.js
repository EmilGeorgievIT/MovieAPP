const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authHelper = require("../helper/user/user-helper");
const encryption = require('../util/encryption');
const {
  jwt_secret
} = require('../config/config');

module.exports = {
  signUp: (req, res, next) => {
    if (authHelper.validateUser(req, res)) {
      const { firstName, lastName, email, password } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);

      User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
        salt
      }).then((user) => {
        try {
          authHelper.sendEmail(req, res);
        } catch (error) {
          console.log(error)
        }
        res.status(201)
          .json(
            { 
              messages: ['User created!'], 
              result: user 
            }
          );
      })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          next(error);
        });
    }
  },
  signIn: (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 404;

          res.status(404).json({
            messages: ["User not found!"]
          })
          throw error;
        } else {
          const { hashedPassword, salt } = user.dataValues;
          const currentHashedPass = encryption.generateHashedPassword(salt, password);

          if (currentHashedPass !== hashedPassword) {
            const error = new Error('A user with this credentials could not be found');
            error.statusCode = 404;

            res.status(404).json({
              messages: ["User not found!"]
            })

            throw error;
          }

          const access_token = jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user.id.toString()
          }, jwt_secret,
            { expiresIn: '1h' });

          res.status(200).json(
            {
              messages: ['logged'],
              result: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                access_token
              }
            });
        }
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      })
  }
}