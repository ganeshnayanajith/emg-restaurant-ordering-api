const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  'development': {
    'username': process.env.MYSQL_DB_USER,
    'password': process.env.MYSQL_DB_PASSWORD,
    'database': process.env.MYSQL_DB_NAME,
    'host': process.env.MYSQL_DB_HOST,
    'dialect': process.env.MYSQL_DB_DIALECT,
  },
};
