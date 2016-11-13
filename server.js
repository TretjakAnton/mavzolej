var path = require('path'),
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  app = express(),
  mysql   = require('mysql'),
  router = express.Router(),
  formidable = require('formidable'),
  fs = require('fs');

var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mySite'
});


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
    if (req.body.login == 'Username' && req.body.password == 'Password') {
      res.json({Auth: 'Logged'});
    } else {
      res.json({Auth: 'Denied'});
    }
  });

router.route('/Types')
    .post(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = 'INSERT INTO type (name_type, directory) VALUES ("'+req.body.name_type+'", "'+req.body.directory+'")';
            connection.query(queryTo, function (err) {
                if (!err) {
                    res.json({success: 'successful added'});
                } else {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    })
    .get(function(req, res){
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
    })
    .put(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = 'UPDATE type SET id_type="'+req.body.id_type+'" name_type="'+req.body.name_type+'", directory="'+req.body.directory+'"';
            connection.query(queryTo, function (err) {
                if (!err) {
                    res.json({success: 'successful added'});
                } else {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    })
    .delete(function (req, res) {
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
    });

router.route('/pam')
    .post(function (req, res) {
      pool.getConnection(function (err, connection) {
        var queryTo = 'INSERT INTO pam (id_fake, id_pam, id_type, opis, price, id_size) VALUES ("","'+req.body.id_pam+'","'+req.body.id_type+'","'+req.body.opis+'","'+req.body.price+'","'+req.body.id_size+'")';
        connection.query(queryTo, function (err) {
          if (!err) {
            res.json({success: 'insert success'});
          } else {
            res.json({error: err.message});
          }
          connection.release();
        });
      });
    })
    .put(function (req, res) {
      pool.getConnection(function (err, connection) {
        var queryTo = 'UPDATE pam SET id_pam="'+req.body.id_pam+'", id_type="'+req.body.id_type+'", opis="'+req.body.opis+'", price="'+req.body.price+'", id_size="'+req.body.id_size+'" WHERE id_fake="'+req.body.id_fake+'"';
        connection.query(queryTo, function (err) {
          if (!err) {
            res.json({success: 'update success'});
          } else {
            res.json({error: err.message});
          }
          connection.release();
        });
      });
    })
    .delete(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = 'SELECT COUNT(*) as imgCount FROM images WHERE id_zapis="'+req.body.id_fake+'"';
            connection.query(queryTo, function (err, rows) {
                if (!err && rows[0].imgCount > 1) {
                    pool.getConnection(function (err, connection) {
                        var queryTo = 'DELETE FROM images WHERE id_image="'+req.body.id_image+'"';
                        connection.query(queryTo, function (err) {
                            if (!err) {
                                res.json({success: 'success deleted image'});
                            } else {
                                res.json({error: err.message});
                            }
                            connection.release();
                        });
                    });
                }
                if(!err && rows[0].imgCount == 1 || !err && rows[0].imgCount == 0){
                    pool.getConnection(function (err, connection) {
                        var queryTo = 'DELETE FROM pam WHERE id_fake="'+req.body.id_fake+'"';
                        connection.query(queryTo, function (err) {
                            if (!err) {
                                res.json({success: 'success deleted pam'});
                            } else {
                                res.json({error: err.message});
                            }
                            connection.release();
                        });
                    });
                }
                if(err) {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    })
    .get(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = '';
            if(req.query.id_fake){
                queryTo = 'SELECT * from pam WHERE id_fake="'+req.query.id_fake+'"';
            } else {
                queryTo = 'SELECT * from pam';
            }
            connection.query(queryTo, function (err, rows) {
                if (!err && rows.length > 0) {
                    res.json(rows);
                } else {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    });

router.route('/getByType')
    .get(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = 'SELECT * from pam WHERE id_type="'+req.query.id_type+'"';
            connection.query(queryTo, function (err, rows) {
                if (!err && rows.length > 0) {
                    res.json(rows);
                } else {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    });

router.route('/size')
    .get(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = 'SELECT * from size';
            connection.query(queryTo, function (err, rows) {
                if (!err && rows.length > 0) {
                    res.json(rows);
                } else {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    })
    .put(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = 'INSERT INTO size (id_size, size_name, size_price) VALUES ("","'+req.body.size_name+'","'+req.body.size_price+'")';
            connection.query(queryTo, function (err, rows) {
                if (!err) {
                    res.json({success: 'successful added'});
                } else {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    })
    .delete(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = 'DELETE FROM size WHERE id_size="'+req.body.id_size+'"';
            connection.query(queryTo, function (err, rows) {
                if (!err) {
                    res.json({success: 'successful deleted'});
                } else {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    });

router.route('/images')
    .get(function (req, res) {
        pool.getConnection(function (err, connection) {
            var queryTo = '';
            if(!req.body.id_image){
                queryTo = 'SELECT * from images';
            } else {
                queryTo = 'SELECT * from images WHERE id_image="'+req.body.id_image+'"';
            }
            connection.query(queryTo, function (err, rows) {
                if (!err && rows.length > 0) {
                    res.json(rows);
                } else {
                    res.json({error: err.message});
                }
                connection.release();
            });
        });
    });
/*
    .post('/upload', function (req, res) {

        // create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '/uploads');

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function (field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });

        // log any errors that occur
        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function () {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);
    });
*/

app.use('/api', router);

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'src', 'index.html'))
});


var server = app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
server.timeout = 5000;