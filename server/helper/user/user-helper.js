const {
  validationResult
} = require('express-validator/check');
const nodemailer = require("nodemailer");
const {
  mail_username,
  mail_pass
} = require('../../config/config');

function validateMail(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Please provide valid message!'
    });

    return false;
  }

  return true;
}

module.exports = {
  sendEmail: (req, res) => {
    if (validateMail(req, res)) {
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          console.error('Failed to create a testing account');
          console.error(err);
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          res.status(500).json({
            message: err.errors
          })
          next(err);
          return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: mail_username,
            pass: mail_pass
          },
          logger: true,
          debug: true // include SMTP traffic in the logs
        }, {
          from: 'Admin <example@nodemailer.com>',
        });

        // Message object
        let message = {
          to: `${req.body.email}`,
          subject: `Message form Projext X Admin`,
          text: 'Welcome to the platform!',
          html: `
                  <h1>Dear ${req.body.firstName}</h1>

                  <p>
                    We are excited to notify you that you have received access to our new platform. 
                    You can log in to the platform with the following credentials. 
                  </p>
                  
                  <p>
                    Once you log in to the platform you must reset your password.
                  </p>

                  <ul>
                        <li>
                            Website url: http://localhost:4200/
                        </li>
                        
                        <li>
                            Username: ${req.body.email}
                        </li>

                        <li>
                            Password: ${req.body.password}
                        </li>
                  </ul>
                  `,
        };

        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.log(error.message);
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            res.status(500).json({
              message: error.errors
            })
            next(error);
          }
          res.status(200).json({
            message: 'Message sent successfully'
          })
          console.log('Message sent successfully!');
          console.log(nodemailer.getTestMessageUrl(info));
          transporter.close();
        });
      });
    }
  },
  validateUser: (req, res) => {
    const errors = validationResult(req);
    console.log(validationResult);
    if (!errors.isEmpty()) {
      res.status(422).json({
        message: 'Validation failed, entered data is incorrect',
        errors: errors.array()
      });
      return false;
    }

    return true;
  }
}
