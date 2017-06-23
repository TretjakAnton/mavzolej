var mysql   = require('mysql');

exports.pool = mysql.createPool({
  host     : '104.236.196.140',
  port     : '3306',
  user     : 'oleg',
  password : '3263206toxa',
  database : 'newpam'
});

/*exports.pool = mysql.createPool({
  host     : '127.0.0.1',
  port     : '4444',
  user     : 'root',
  password : '',
  database : 'newpam'
});*/
