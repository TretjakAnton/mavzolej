var assert = require('assert'); 
var mongo = require('mongodb');

exports.setNew = (req, res, db) => {
  let rows = [];
  req.body.data.map((el) => {
    rows.push({
      db_type: 'field',
      field_type: el.field_type,
      name: el.name,
      description: el.description,
      price: el.price,
    });
  });

  console.log(rows);

  db.insertMany(rows, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
  });
};

exports.getForm = (req, res, db) => {
  const search = { db_type: 'field' };
  
  db.find(search).toArray(function(err, result) {
    assert.equal(err, null);
    res.json(result);
  });
};
