var pool = require('./poolConnection').pool;

exports.setNewType = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryTo = 'INSERT INTO type (name, folder) VALUES ("'+req.body.name_type+'", "'+req.body.directory+'")';
    connection.query(queryTo, function (err) {
      if (!err) {
        res.json({success: 'successful added'});
      } else {
        res.json({error: err.message});
      }
      connection.release();
    });
  });
};

exports.getAllTypes = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryTo = 'SELECT * from type';
    connection.query(queryTo, function (err, rows) {
      if (!err && rows.length > 0) {
        res.json(rows);
      } else {
        res.json({error: err.message});
      }
      connection.release();
    });
  });
};

exports.updateType = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryTo = 'UPDATE type SET id_type="'+req.body.id_type+'" name="'+req.body.name_type+'", folder="'+req.body.directory+'"';
    connection.query(queryTo, function (err) {
      if (!err) {
        res.json({success: 'successful added'});
      } else {
        res.json({error: err.message});
      }
      connection.release();
    });
  });
};

exports.deleteType = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryTo = 'DELETE FROM type WHERE id_type="'+req.body.id_type+'"';
    connection.query(queryTo, function (err, rows) {
      if (!err) {
        res.json({success: 'successful deleted'});
      } else {
        res.json({error: err.message});
      }
      connection.release();
    });
  });
};
