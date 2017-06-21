var mysql   = require('mysql');

exports.pool = mysql.createPool({
  host     : 'http://mavzolejmaster.com',
  port     : '3306',
  user     : 'root',
  password : '3263206toxa',
  database : 'newpam'
});

