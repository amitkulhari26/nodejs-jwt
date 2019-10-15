const mysql = require('mysql');
const connection = mysql.createPool({
    database: 'jwt',
    user: 'aws1',
    password: 'DB Password',
    host: 'DB Host',
});
module.exports = connection;