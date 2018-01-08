var assert = require('assert'); 
var mongo = require('mongodb');
var createMenu = require('../model');

exports.setNewItem = (req, res, db) => {
  const note = {
    db_type: 'menu',
    menu_name: req.body.menu_name,
  };

  db.insert(note, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
  });
};

exports.getAllMenuItems = (req, res, db) => {
  const search = { db_type: 'menu' };

  db.find(search).toArray(function(err, result) {
    assert.equal(err, null);
    res.json(result);
  });
};

exports.updateMenuItem = (req, res, db) => {
  const search = { menu_name: req.body.oldMenu_name };

  const item = { menu_name: req.body.newMenu_name };

  db.updateMany(search, {$set: item}, (err, result) => {
    assert.equal(err, null);
    console.log("Updated");
    res.send(result);
  });
};

exports.deleteMenuItem = (req, res, db) => {
  const search = {
    _id: new mongo.ObjectID(req.body.id)
  }

  db.removeOne(search, function(err, result) {
    assert.equal(null, err);
    res.send(result)
  });
};
