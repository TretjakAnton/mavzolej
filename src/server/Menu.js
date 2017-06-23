var pool = require('./poolConnection').pool;

exports.setNewItem = (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var queryTo = 'INSERT INTO menu (menu_name) VALUES ("'+req.body.menu_name+'")';
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

exports.getAllMenuItems = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryTo = 'SELECT * from menu';
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

exports.updateMenuItem = (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var queryTo = 'UPDATE menu SET menu_name="'+req.body.menu_name+'" WHERE id_item="'+req.body.id_item+'"';
    connection.query(queryTo, function (err) {
      if (!err) {
        res.json({success: 'successful updated'});
      } else {
        res.json({error: err.message});
      }
      connection.release();
    });
  });
};

exports.deleteMenuItem = (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var queryTo = 'DELETE FROM menu WHERE id_item="'+req.body.id_item+'"';
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
