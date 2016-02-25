'use strict';

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

module.exports = {

  connect() {
    client.connect('mongodb://localhost:27017/olympics-dev', (err, db) => {
      if (err) {
        console.error("Error connecting to MongoDB server - check mongod has been started");
        process.exit(1);
      }
      _db = db;
      console.log('MongoDB Server connected');
    })
  },

  sports() {
    return _db.collection('sports');
  }
};
