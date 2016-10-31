var path = require('path'),
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  app = express(),
  router = express.Router();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/src'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

router.route('/login')

.post(function (req, res) {
  setTimeout(function () {
    if (req.body.login == 'Username' && req.body.password == 'Password') {
      res.json({Auth: 'Logged', Language: 'EN'});
    } else {
      res.json({Auth: 'Denied'});
    }
  }, 2000);
});

app.use('/api', router);

app.get('*', function (req, res) {
  res.redirect('/');
});


var server = app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
server.timeout = 5000;