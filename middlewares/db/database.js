const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config();

function toCheckData(database, cb) {
  database.collection(process.env.COLLECTION).find({}).toArray((error, result) => {
    if (error) {
      cb(error);
      return;
    }
    if (!result) {
      const err = new Error('Internal Server Error');
      err.status = 500;
      cb(err);
      return;
    }
    cb(null, result);
  });
}

module.exports.connectToDb = (cb) => {


};

(function () {
  mongoose.connect('mongodb://unicorn-84:?1R28}~*|%M5IqhO@ds141068.mlab.com:41068/newsbucket')
    .then(response => console.log(response))
    .catch(error => console.log(error));
}());
