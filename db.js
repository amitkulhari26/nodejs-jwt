const mysql = require('mysql');
const connection = mysql.createPool({
    database: 'jwt',
    user: 'aws1',
    password: 'Your DB password',
    host: 'DB Host',
});
module.exports = connection;