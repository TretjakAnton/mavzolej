var mysql   = require('mysql');

exports.pool = mysql.createPool({
  host     : '127.0.0.1',
  port     : '4444',
  user     : 'root',
  password : '',
  database : 'newpam'
});

