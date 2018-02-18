var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = process.env.MONGO_URL;
//'mongodb://localhost:27017/myproject';

exports.connect = (app) => {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    var noteCollection;
    db.collections(function(err, collections){
      noteCollection = collections.find((colection) => {
        return colection.collectionName == 'notes';
      });
      if(!noteCollection) {
        db.createCollection('notes', function(err, res) {
          if (err) throw err;
          console.log('Collection created!');
          initDB(db)
        });
      }
      require('./routes')(app, db.collection('notes'));
    });
  });
}


function initDB(db) {
  const typeNote = {
    db_type: 'pam_type',
    type_name: 'Одинарные',
    folder: '/odinarnue',
    menu_name: 'Главное',
  };

  const menuItem = {
    db_type: 'menu',
    menu_name: 'Главное',
  };

  db.collection('notes').insert(menuItem, (err, result) => {
    if (err) { 
      console.log({ 'error': 'An error has occurred' }); 
    } else {
      console.log('menu created');
      db.collection('notes').insert(typeNote, (err, result) => {
        if (err) { 
          console.log({ 'error': 'An error has occurred' }); 
        } else {
          console.log('type successfylly created')
        }
      })
    }
  });  
}