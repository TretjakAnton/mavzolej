var assert = require('assert'); 
var mongo = require('mongodb');

exports.setNewType = (req, res, db) => {
  const note = {
    db_type: 'pam_type',
    type_name: req.body.type_name,
    folder: req.body.folder,
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

exports.getAllTypes = (req, res, db) => {
  const search = { db_type: 'pam_type' };
  
  db.find(search).toArray(function(err, result) {
    assert.equal(err, null);
    res.json(result);
  });
};

exports.updateType = (req, res, db) => {
  const search = { type_name: req.body.oldType_name };
  
  const item = { 
    type_name: req.body.type_name,
    folder: req.body.folder,
    menu_name: req.body.menu_name,
  };
  
  db.updateMany(search, {$set: item}, (err, result) => {
    assert.equal(err, null);
    console.log("Updated");
    res.send(result);
  });
};

exports.deleteType = (req, res, db) => {
  const search = {
    type_name: req.body.type_name
  }

  db.deleteMany(search, function(err, result) {
    assert.equal(null, err);
    res.send(result)
  });
};
