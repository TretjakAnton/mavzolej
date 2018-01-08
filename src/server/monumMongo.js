var assert = require('assert'); 
var mongo = require('mongodb');

exports.newNode = (req, res, db) => {
  const note = { 
    text: req.body.body, 
    title: req.body.title,
    images: ["some", "images", "many"],
  };
  db.insert(note, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
  });
}

exports.getAll = (req, res, db) => {
  db.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
}

exports.updateAll = (req, res, db) => {
  const searche = {
    body: 'NEW TITLE',
  }

  const note = { 
    text: req.body.body,
  };

  db.updateMany(searche, {$set: note}, (err, result) => {
    assert.equal(err, null);
    console.log("Updated");
    res.send(result);
  });
}

exports.update = (req, res, db) => {
  const searche = {
    _id: new mongo.ObjectID(req.body.id)
  }

  const note = { 
    text: req.body.body, 
    title: req.body.title,
  };

  //collection.find(searche).limit(1).toArray().then((el) => {
  //  console.log(el[0]);
  //  collection.updateOne(el[0], note, (err, result) => {
  //    assert.equal(err, null);
  //    console.log("Updated");
  //    res.send(result);
  //  });
  //});

  db.updateOne(searche, note, (err, result) => {
    assert.equal(err, null);
    console.log("Updated");
    res.send(result);
  });
}