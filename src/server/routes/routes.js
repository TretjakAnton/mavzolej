var express = require('express'),
    router = express.Router();

module.exports = function(app, db) {
  var mongo = require('../monumMongo')
  
  router.route('/newP')
    .post(function(req, res) {mongo.newNode(req, res, db)})
    .put(function (req, res) {mongo.updateAll(req, res, db)})
    .delete(function (req, res) {res.send("ok")})
    .options(function (req, res) {mongo.getAll(req, res, db)});

  var menu = require('../newMongo/menu')

  router.route('/newMenu')
    .post(function(req, res) {menu.setNewItem(req, res, db)})
    .put(function (req, res) {menu.updateMenuItem(req, res, db)})
    .delete(function (req, res) {menu.deleteMenuItem(req, res, db)})
    .options(function (req, res) {menu.getAllMenuItems(req, res, db)});

  var type = require('../newMongo/type')
    
  router.route('/newType')
    .post(function(req, res) {type.setNewType(req, res, db)})
    .put(function (req, res) {type.updateType(req, res, db)})
    .delete(function (req, res) {type.deleteType(req, res, db)})
    .options(function (req, res) {type.getAllTypes(req, res, db)});

  var fields = require('../newMongo/fields')
    
  router.route('/newFields')
    .post(function(req, res) {fields.setNew(req, res, db)})
    .options(function (req, res) {fields.getForm(req, res, db)});

  var monum = require('../newMongo/pam')
    
  router.route('/newMonum')
    .put(function(req, res) {monum.setUpdateMon(req, res, db)})
    .post(function(req, res) {monum.setUpdateMon(req, res, db)})
    .delete(function(req, res) {monum.deleteMon(req, res, db)})
    .options(function (req, res) {monum.getMon(req, res, db)});

  router.route('/countPams')
    .options(function (req, res) {monum.getRowsCount(req, res, db)});

  router.route('/pamImage')
    .delete(function (req, res) {monum.deleteImage(req, res, db)});

  app.use('/api', router);
};