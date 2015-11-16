var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('../config');

MongoClient.connect(config.mongoConn.AWS, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
});

