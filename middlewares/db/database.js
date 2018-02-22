const path = require('path');
const { MongoClient } = require('mongodb');
const nconf = require('nconf');

nconf.env().argv().file({ file: path.join(__dirname, '../../config.json') });
const dbName = nconf.get('db:mlab:name');
const collection = nconf.get('db:mlab:collection');

function toCheckData(database, cb) {
  database.collection(collection).find({}).toArray((error, result) => {
    if (error) {
      cb(error);
      return;
    }
    if (!result) {
      const err = new Error('Internal Server Error');
      err.status = 500;
      cb(error);
      return;
    }
    cb(null, result);
  });
}

module.exports.connectToDb = (cb) => {
  const url = `mongodb://${nconf.get('db:mlab:user')}:${nconf.get('db:mlab:password')}@ds141068.mlab.com:41068/${dbName}`;
  MongoClient.connect(url, (error, db) => {
    if (error) {
      cb(error);
      return;
    }
    const database = db.db(dbName);
    toCheckData(database, cb);
  });
};
