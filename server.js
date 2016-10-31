var path = require('path'),
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  app = express(),
  mysql   = require('mysql'),
  router = express.Router();

var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mySite'
});


app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/src'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));



//api route config
router.route('/login')
.post(function (req, res) {
  debugger;
  if (req.body.login == 'Username' && req.body.password == 'Password') {
    res.json({Auth: 'Logged'});
  } else {
    res.json({Auth: 'Denied'});
  }
});

router.route('/allTypes')
    .post(function(req, res){
      pool.getConnection(function(err, connection) {
        var queryTo = 'SELECT name_type from type';
        connection.query(queryTo, function (err, rows) {
          if(!err && rows.length > 0) {
            res.json(rows);
          } else {
            res.json({error: 'Sorry we have error on the server. Please try again later'});
          }
          connection.release();
        });
      });
    });

app.use('/api', router);

app.get('*', function (req, res) {
  res.redirect('/');
});


var server = app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
server.timeout = 5000;