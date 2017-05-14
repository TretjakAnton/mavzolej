var mysql   = require('mysql');

exports.pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'newpam'
});
