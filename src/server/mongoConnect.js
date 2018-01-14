var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = process.env.MONGO_URL;
// 'mongodb://mavzolej:13a357b25a39c35f673694f414c6254d@dokku-mongo-mavzolej:27017/mavzolej';
//'mongodb://localhost:27017/myproject';

exports.connect = (app) => {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    require('./routes')(app, db.collection('notes'));
  });
}