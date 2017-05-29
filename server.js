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
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));

//api route config
router.route('/login')
  .post(function (req, res) {
    debugger;
    if (req.body.login == 'Oleg' && req.body.password == '0504065007oleg') {
      res.json({Auth: 'Logged'});
    } else {
      res.json({Auth: 'Denied'});
    }
  });

var formControl = require('./src/server/FormFields');

router.route('/form')
  .get(function(req, res) {formControl.getForm(req, res)})
  .put(function(req, res) {formControl.setNew(req, res)});

var typeControl = require('./src/server/Types');

router.route('/Types')
  .post(function (req, res) {typeControl.setNewType(req, res)})
  .get(function(req, res){typeControl.getAllTypes(req, res)})
  .put(function (req, res) {typeControl.updateType(req, res)})
  .delete(function (req, res) {typeControl.deleteType(req, res)});

var menuControl = require('./src/server/Menu');

router.route('/menu')
  .post(function (req, res) {menuControl.setNewItem(req, res)})
  .get(function(req, res){menuControl.getAllMenuItems(req, res)})
  .put(function (req, res) {menuControl.updateMenuItem(req, res)})
  .delete(function (req, res) {menuControl.deleteMenuItem(req, res)});

var monumentControl = require('./src/server/Monuments');

router.route('/monuments')
  .get(function (req, res) {monumentControl.getMon(req, res)})
  .put(function (req, res) {monumentControl.setNewMon(req, res)})
  .delete(function (req, res) {monumentControl.deleteMon(req, res)});

router.route('/monumentsCount')
  .get(function(req, res) {monumentControl.getRowsCount(req, res)});

var emailSender = require('./src/server/emailSender');

router.route('/sendEmail')
  .post(function(req, res) {emailSender.send(req, res)});

app.use('/api', router);

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'src', 'index.html'))
});


var server = app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
server.timeout = 5000;
