var pool = require('./poolConnection').pool,
    fs = require('fs'),
    formidable = require('formidable'),
    path = require('path');

exports.setNewMon = (req, res) => {
  // create an incoming form object
  var form = new formidable.IncomingForm();
  var id, folder, price, id_type;

  form.on('field', function (name, val) {
    if(name == 'id_pam')
      id = val;
    if(name == 'folder'){
      folder = val;
    }
    if(name == 'id_type')
      id_type = val;
    if(name == 'price'){
      price = val;
      pool.getConnection(function (err, connection) {
        var queryTo = 'INSERT INTO products (id_pam, id_type, price) VALUES ("'+id+'", "'+id_type+'", "'+price+'")';
        connection.query(queryTo, function (err) {
          connection.release();
        });
      });
    }
  });

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../media');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    var newFolder = path.join(__dirname, '../media/'+folder);

    if (!fs.existsSync(newFolder)){
      fs.mkdirSync(newFolder);
    }

    fs.rename(file.path, path.join(newFolder, file.name));

    pool.getConnection(function (err, connection) {
      var queryTo = 'SELECT MAX(id_prod) as id FROM products';
      connection.query(queryTo, function (err, rows) {
        var imageTo = rows[0].id;
        if (!err) {
          pool.getConnection(function (err, connection) {
            var queryTo = 'INSERT INTO image (id_pam, image) VALUES ("'+imageTo+'", "'+file.name+'")';
            connection.query(queryTo, function (err) {
              connection.release();
            });
          });
        } else {
          // res.json({error: err.message});
        }
        connection.release();
      });
    });
  });

  // log any errors that occur
  form.on('error', function(err) {
    res.json({error: err.message});
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.json({success: 'successful added files'});
  });

  // parse the incoming request containing the form data
  form.parse(req);
};

exports.getMon = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryTo = '';
    if(req.query.folder === "true"){
      queryTo = 'SELECT * from products INNER JOIN type ON products.id_type=type.id_type WHERE type.id_type="'+req.query.id_type+'" ORDER BY products.id_pam LIMIT '+req.query.from+', '+req.query.countRow+'';
    }
    if(req.query.id_type && req.query.from && req.query.countRow && req.query.folder === "undefined") {
      queryTo = 'SELECT * from products WHERE id_type="'+req.query.id_type+'" LIMIT '+req.query.from+', '+req.query.countRow+'';
    }
    if(!req.query.id_type && req.query.from && req.query.countRow && req.query.folder === "undefined") {
      queryTo = 'SELECT * from products LIMIT '+req.query.from+', '+req.query.countRow+'';
    }
    if(req.query.id_prod && !req.query.id_type && !req.query.from && !req.query.countRow && req.query.folder === "undefined") {
      queryTo = 'SELECT * from products WHERE id_prod="'+req.query.id_prod+'"';
    }
    connection.query(queryTo, function (err, rows) {
      if (!err && rows.length > 0) {
        var resProd = rows;
        var listIdProd='';
        rows.forEach(function(elem, key){
          listIdProd += `${elem.id_prod},`;
        });
        listIdProd = listIdProd.slice(0, -1);
        pool.getConnection(function (err, connection) {
          var queryTo = 'SELECT * FROM image WHERE id_pam IN ('+listIdProd+')';
          connection.query(queryTo, function (err, rows) {
            if (!err) {
              var join = [];
              for (var i=0; i<rows.length; i++){
                join[i] = Object.assign(rows[i], resProd.find(function(el){
                  if(el.id_prod == rows[i].id_pam)
                    return el
                }));
              }
              res.json(join);
            } else {
              res.json({error: err.message});
            }
            connection.release();
          });
        });
      } else {
        res.json({error:'no one row exist'});
      }
      connection.release();
    });
  });
};

exports.deleteMon = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryDelItem = 'DELETE FROM products WHERE id_prod="'+req.body.id_prod+'"';
    var queryDelImg = 'DELETE FROM image WHERE id_img="'+req.body.id_img+'"';
    var queryCol = 'SELECT COUNT(*) AS col FROM image WHERE id_pam="'+req.body.id_prod+'"';
    connection.query(queryCol, function (err, rows) {
      if (rows[0].col > 1) {
        pool.getConnection(function (err, connection) {
          connection.query(queryDelImg, function (err, rows) {
            if (!err) {
              fs.unlinkSync(path.join(__dirname, '/src/media/' + req.body.imgUrl));
              res.json({success: 'successful deleted'});
            } else {
              res.json({error: err.message});
            }
            connection.release();
          });
        });
      } else {
        pool.getConnection(function (err, connection) {
          connection.query(queryDelImg, function (err, rows) {
            if (!err) {
              fs.unlinkSync(path.join(__dirname, '../media/' + req.body.imgUrl));
              pool.getConnection(function (err, connection) {
                connection.query(queryDelItem, function (err, rows) {
                  if (!err) {
                    pool.getConnection(function (err, connection) {
                      connection.query(queryDelImg, function (err, rows) {
                        if (!err) {
                          res.json({success: 'successful deleted'});
                        } else {
                          res.json({error: err.message});
                        }
                        connection.release();
                      });
                    });
                  } else {
                    res.json({error: err.message});
                  }
                });
              });
            } else {
              res.json({error: err.message});
            }
            connection.release();
          });
        });
      }
    });
  });
};

exports.getRowsCount = (req, res) => {
  pool.getConnection(function (err, connection) {
    var queryTo = 'SELECT COUNT(*) as count from products WHERE id_type="'+req.query.id_type+'"';
    connection.query(queryTo, function (err, rows) {
      if (!err && rows.length > 0) {
        res.json(rows[0].count);
      } else if (!err && rows.length == 0) {
        res.json({error: 'пустая таблица'});
      } else {
        res.json({error: err.message});
      }
      connection.release();
    });
  });
};
