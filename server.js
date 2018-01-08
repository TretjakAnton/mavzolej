var path = require('path'),
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  app = express(),
  util = require('util'),
  router = express.Router();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/src'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
  extended: true
}));

var database = require('./src/server/mongoConnect');
database.connect(app);

//api route config
router.route('/login')
  .post(function (req, res) {
    if (req.body.login == 'Oleg' && req.body.password == '0504065007oleg') {
      res.json({Auth: 'Logged'});
    } else {
      res.json({Auth: 'Denied'});
    }
  });

var emailSender = require('./src/server/emailSender');

router.route('/sendEmail')
  .post(function(req, res) {emailSender.send(req, res)});

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'src', 'index.html'))
});

app.use('/api', router);

app.listen(app.get('port'), function () {
  console.log('Server started at port:' + app.get('port') + '/');
});
