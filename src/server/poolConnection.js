var mysql   = require('mysql');

exports.pool = mysql.createPool({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : '3263206toxa',
  database : 'newpam'
});

