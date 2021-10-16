const dotenv = require('dotenv-flow');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mail_username: process.env.MAIL_USERNAME,
  mail_pass: process.env.MAIL_PASS,
  jwt_secret: process.env.JWT_SECRET,
  mysql_username: process.env.MYSQL_USERNAME,
  mysql_password: process.env.MYSQL_PASSWORD,
  mysql_schema: process.env.MYSQL_SCHEMA,
  mysql_host: process.env.MYSQL_HOST
};