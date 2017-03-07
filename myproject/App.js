/* eslint-disable max-len */
/* eslint-disable no-console */
const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  db.close();
});

const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3}
  ], function (err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });

  var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
  var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    insertDocuments(db, function () {
      db.close();
    });
  });

  var findDocuments = function (db, callback) {
  // Get the documents collection
    const collection = db.collection('documents');
  // Find some documents
    collection.find({}).toArray(function (err, docs) {
      assert.equal(err, null);
      console.log('Found the following records');
      console.log(docs);
      callback(docs);
    });
  };

  var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
  var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log('Connected correctly to server');

    insertDocuments(db, function () {
      findDocuments(db, function () {
        db.close();
      });
    });
  });

  var findDocuments = function (db, callback) {
  // Get the documents collection
    const collection = db.collection('documents');
  // Find some documents
    collection.find({a: 3}).toArray(function (err, docs) {
      assert.equal(err, null);
      console.log('Found the following records');
      console.log(docs);
      callback(docs);
    });      
  };

  const updateDocument = function (db, callback) {
  // Get the documents collection
    const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
    collection.updateOne({ a: 2 }
    , { $set: { b: 1 } }, function (err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log('Updated the document with the field a equal to 2');
      callback(result);
    });  
  };

  var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
  var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    insertDocuments(db, function () {
      updateDocument(db, function () {
        db.close();
      });
    });
  });

  const indexCollection = function (db, callback) {
    db.collection('documents').createIndex(
    { a: 1 },
      null,
      function (err, results) {
        console.log(results);
        callback();
      }
  );
  };

  var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
  var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    insertDocuments(db, function () {
      indexCollection(db, function () {
        db.close();
      });
    });
  }
);
};
