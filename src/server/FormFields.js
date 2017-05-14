var pool = require('./poolConnection').pool;

exports.setNew = (req, res) => {
  pool.getConnection(function (err, connection) {
    const saveObj = req.body.data;
    for (var key in saveObj) {
      var queryTo = 'INSERT INTO fields (type, name, description, price) VALUES ("' + saveObj[key].type + '", "' + saveObj[key].name + '", "' + saveObj[key].description + '", "' + saveObj[key].price + '")';
      connection.query(queryTo, function (err, rows) {
        if (!err) {
          res.json("success");
        } else {
          res.json({error: err.message});
        }
      });
    }
    connection.release();
  });
};

exports.getForm = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryTo = 'SELECT * from fields';
    connection.query(queryTo, function (err, rows) {
      if (!err && rows.length > 0) {
        res.json(rows);
      } else if (!err && rows.length == 0) {
        res.json({error: 'пустая таблица'});
      } else {
        res.json({error: err.message});
      }
      connection.release();
    });
  });
};
