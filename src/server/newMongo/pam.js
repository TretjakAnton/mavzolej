var fs = require('fs'),
  formidable = require('formidable'),
  path = require('path');
var assert = require('assert');
var mongo = require('mongodb');

exports.setUpdateMon = (req, res, db) => {
  // create an incoming form object
  let form = new formidable.IncomingForm();
  let id, folder, price, type_name, menu_name, oldImg;
  let _id = false;

  form.on('field', function (name, val) {
    if (name == 'id_pam')
      id = val;
    if (name == '_id')
      _id = val;
    if (name == 'oldImg')
      oldImg = val;
    if (name == 'folder')
      folder = val;
    if (name == 'type_name')
      type_name = val;
    if (name == 'menu_name')
      menu_name = val;
    if (name == 'price')
      price = val;
  });

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../media/images');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function (field, file) {
    var rootFolder = path.join(__dirname, '../../media/images')
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder);
    }
    var newFolder = path.join(rootFolder, folder);

    if (!fs.existsSync(newFolder)) {
      fs.mkdirSync(newFolder);
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    let fileName = getRandomInt(8, 99999) + file.name;
    
    fs.rename(file.path, path.join(newFolder, fileName), function (err) {
      if (err) throw err;
      console.log('renamed complete');
    });
    
    let item = {
      db_type: 'pam',
      id_pam: id,
      price: price,
      type_name: type_name,
      folder: folder,
      menu_name: menu_name,
      images: [
        fileName
      ]
    }

    if (_id) {
      const search = {
        db_type: 'pam',
        _id: new mongo.ObjectID(_id),
      };

      setItem = {
        $push: { 'images': fileName }
      }

      db.update(search, setItem, (err, result) => {
        assert.equal(err, null);
        console.log("successfully added");
      });
    } else {
      const search = {
        db_type: 'pam',
        id_pam: id,
        price: price,
        type_name: type_name,
        folder: folder,
        menu_name: menu_name
      }

      imagePush = {
        $push: { 'images': fileName }
      }

      db.find(search).toArray(function (err, docs) {
        if (assert.equal(err, null) || docs.length === 0) {
          db.insert(item, (err, result) => {
            if (err) {
              console.log({ 'error': 'An error has occurred' });
            } else {
              console.log("success");
            }
          });
        } else {
          db.update(search, imagePush, (err, result) => {
            assert.equal(err, null);
            console.log("successfully added");
          });
        }
      });
    }
  });

  // log any errors that occur
  form.on('error', function (err) {
    res.json({ error: err.message });
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    if (_id) {
      const search = {
        db_type: 'pam',
        _id: new mongo.ObjectID(_id),
      };
      setItem = {
        $set: {
          db_type: 'pam',
          id_pam: id,
          price: price,
          type_name: type_name,
          folder: folder,
          menu_name: menu_name,
        }
      }

      db.find(search).toArray(function (err, docs) {
        assert.equal(err, null);
        let oldMon = docs[0];

        if(oldMon.folder != folder) {
          let pathToNewFolder = path.join(__dirname, '../../media/images' + folder);
          if (!fs.existsSync(pathToNewFolder)) {
            fs.mkdirSync(pathToNewFolder);
          }
          let pathToOldFolder = path.join(__dirname, '../../media/images' + oldMon.folder);
          oldMon.images.map((el) => {
            if(fs.existsSync(pathToOldFolder + '/' + el)) {
              fs.rename(pathToOldFolder + '/' + el, pathToNewFolder + '/' + el, function(response){
                if (response && response.message) {
                  console.log(response.message)
                }
                console.log(response)
              });
            }
          })
        }

        db.update(search, setItem, (err, result) => {
          assert.equal(err, null);
          console.log("successfully added");
          db.find(search).toArray(function (err, docs) {
            assert.equal(err, null);
            res.json(docs[0]);
          });
        });
      });
    } else {
      res.json({ success: 'successful added files' });
    }
  });

  // parse the incoming request containing the form data
  form.parse(req);
};

exports.getMon = (req, res, db) => {
  var queryTo = '';
  if ((req.body.type_name && (req.body.from || req.body.from === 0) && req.body.countRow && !req.body.folder) || req.body.folder) {
    const search = {
      db_type: 'pam',
      type_name: req.body.type_name
    };

    db.find(search).skip(parseInt(req.body.from)).limit(parseInt(req.body.countRow)).toArray(function (err, docs) {
      assert.equal(err, null);
      res.json(docs);
    });
  }
  if (!req.body.type_name && (req.body.from || req.body.from === 0) && req.body.countRow && !req.body.folder) {
    const search = {
      db_type: 'pam',
    };

    db.find(search).skip(parseInt(req.body.from)).limit(parseInt(req.body.countRow)).toArray(function (err, docs) {
      assert.equal(err, null);
      res.json(docs);
    });
  }
  if (req.body.id_pam && !req.body.type_name && (!req.body.from && req.body.from !== 0) && !req.body.countRow && !req.body.folder) {
    const search = {
      db_type: 'pam',
      id_pam: req.body.id_pam,
    };

    db.find(search).toArray(function (err, docs) {
      assert.equal(err, null);
      res.json(docs);
    });
  }
};

exports.deleteMon = (req, res, db) => {
  const search = {
    _id: new mongo.ObjectID(req.body._id),
  };

  db.find(search).toArray(function (err, result) {
    if (assert.equal(err, null)) {
      res.send({ error: 'fail to delete' })
    } else {
      const images = result[0].images;
      const folder = result[0].folder;
      db.deleteOne(search, (err, resDelete) => {
        assert.equal(err, null);
        images.map((image) => {
          var pathImg = path.join(__dirname, '/../../media/images' + folder + '/' + image);
          if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
          }
        })
        res.send({ success: 'successfuly deleted' });
      });
    }
  });
};

exports.deleteImage = (req, res, db) => {
  const search = {
    db_type: 'pam',
    _id: new mongo.ObjectID(req.body._id),
  };

  const deleteItem = {
    $pull: { 'images': req.body.image }
  }

  db.update(search, deleteItem, (err, result) => {
    assert.equal(err, null);
    console.log("Deleted");
    var pathImg = path.join(__dirname, '/../../media/images/' + req.body.folder + '/' + req.body.image);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
    res.send(result);
  });
};

exports.getRowsCount = (req, res, db) => {
  const search = {
    db_type: 'pam',
    type_name: req.body.type_name,
  };

  db.find(search).toArray(function (err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
};

exports.updatePam = (req, res, db) => {
  const search = {
    db_type: 'pam',
    _id: new mongo.ObjectID(req.body.model._id),
  };

  let updatedPam = {};
  
  for(var k in req.body.model) updatedPam[k]=req.body.model[k];

  delete updatedPam._id;

  db.update(search, updatedPam, (err, result) => {
    assert.equal(err, null);
    console.log("Updated");
    res.send(result);
  });
}
