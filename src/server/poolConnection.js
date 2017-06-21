var mysql   = require('mysql');

exports.pool = mysql.createPool({
  host     : '104.236.196.140',
  port     : '3306',
  user     : 'root',
  password : '3263206toxa',
  database : 'newpam'
});

