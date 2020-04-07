var fs = require('fs'),
  formidable = require('formidable'),
  path = require('path');
var assert = require('assert');
var mongo = require('mongodb');

exports.setUpdateMon = (req, res, db) => {
  // create an incoming form object
  let form = new formidable.IncomingForm();
  let params = { _id: false }; // id, folder, description, price, type_name, menu_name, oldImg
  const arrayOfImg = [];

  form.on('field', function (name, val) {
    if (name == 'id_pam')
      params.id = val;
    if (name == '_id')
      params._id = val;
    if (name == 'oldImg')
      params.oldImg = val;
    if (name == 'folder')
      params.folder = val;
    if (name == 'type_name')
      params.type_name = val;
    if (name == 'menu_name')
      params.menu_name = val;
    if (name == 'price')
      params.price = val;
    if (name == 'description')
      params.description = val;
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
    var newFolder = path.join(rootFolder, params.folder);

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
    
    arrayOfImg.push(fileName);
  });

  // log any errors that occur
  form.on('error', function (err) {
    res.json({ error: err.message });
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    saveOrUpdateItem(arrayOfImg, params, db);
    if (params._id) {
      const search = {
        db_type: 'pam',
        _id: new mongo.ObjectID(params._id),
      };
      setItem = {
        $set: {
          db_type: 'pam',
          id_pam: parseInt(params.id),
          price: params.price,
          description: params.description,
          type_name: params.type_name,
          folder: params.folder,
          menu_name: params.menu_name,
        }
      }
      var imgPath = path.join(__dirname, '../../media/images');
      checkOfExisting(imgPath);

      db.find(search).toArray(function (err, docs) {
        assert.equal(err, null);
        let oldMon = docs[0];

        if(oldMon.folder != params.folder) {
          let pathToNewFolder = path.join(imgPath, params.folder);
          checkOfExisting(pathToNewFolder);
          let pathToOldFolder = path.join(imgPath, oldMon.folder);
          oldMon.images.map((el) => {
            checkOfExisting(pathToOldFolder);
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

saveOrUpdateItem = (images, params, db) => {
  if (params._id) {
    const search = {
      db_type: 'pam',
      _id: new mongo.ObjectID(params._id),
    };

    setItem = {
      $push: { 'images': images }
    }

    db.update(search, setItem, (err, result) => {
      assert.equal(err, null);
      console.log("successfully added");
    });
  } else {
    let item = {
      db_type: 'pam',
      id_pam: parseInt(params.id),
      price: params.price,
      description: params.description,
      type_name: params.type_name,
      folder: params.folder,
      menu_name: params.menu_name,
      images
    }

    db.insert(item, (err, result) => {
      if (err) {
        console.log({ 'error': 'An error has occurred' });
      } else {
        console.log("success");
      }
    });
  }

};

exports.getMon = (req, res, db) => {
  var queryTo = '';
  if ((req.body.type_name && (req.body.from || req.body.from === 0) && req.body.countRow && !req.body.folder) || req.body.folder) {
    const search = {
      db_type: 'pam',
      type_name: req.body.type_name
    };

    db.find(search).sort({id_pam: 1}).skip(parseInt(req.body.from)).limit(parseInt(req.body.countRow)).toArray(function (err, docs) {
      assert.equal(err, null);
      res.json(docs);
    });
  }
  if (!req.body.type_name && (req.body.from || req.body.from === 0) && req.body.countRow && !req.body.folder) {
    const search = {
      db_type: 'pam',
    };

    db.find(search).sort({id_pam: 1}).skip(parseInt(req.body.from)).limit(parseInt(req.body.countRow)).toArray(function (err, docs) {
      assert.equal(err, null);
      res.json(docs);
    });
  }
  if (req.body.id_pam && !req.body.type_name && (!req.body.from && req.body.from !== 0) && !req.body.countRow && !req.body.folder) {
    const search = {
      db_type: 'pam',
      id_pam: parseInt(req.body.id_pam),
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
  updatedPam.id_pam = parseInt(updatedPam.id_pam);

  db.update(search, updatedPam, (err, result) => {
    assert.equal(err, null);
    console.log("Updated");
    res.send(result);
  });
}

function checkOfExisting(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
}
