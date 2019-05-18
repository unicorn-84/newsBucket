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
  // mongoose.connect(process.env.DB_CONN)
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error));
  MongoClient.connect(process.env.DB_CONN, { useNewUrlParser: true });
};
