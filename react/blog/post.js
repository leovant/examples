var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:32768/Blog';

module.exports = {
  addPost: function(title, subject, callback) {
    MongoClient.connect(url, function(err, db) {
      db.collection('posts').insertOne({
        title: title,
        subject: subject
      }, function(err, result) {
        assert.equal(err, null);
        console.log('Saved the blog post.');

        if (err === null) {
          callback(true);
        } else {
          callback(false);
        }
      });
    });
  },
  getPosts: function(callback) {
    MongoClient.connect(url, function(err, db) {
      db.collection('posts', function(err, collection) {
        collection.find().toArray(function(err, list) {
          callback(list);
        });
      });
    });
  }
};
