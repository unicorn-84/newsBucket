const config = require('../../libs/config');
const { MongoClient } = require('mongodb');

const dbName = config.get('db:mlab:name');
const collection = config.get('db:mlab:collection');

function toCheckData(database, cb) {
  database.collection(collection).find({}).toArray((error, result) => {
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
  const url = `mongodb://${config.get('db:mlab:user')}:${config.get('db:mlab:password')}@${config.get('db:mlab:domain')}/${dbName}`;
  MongoClient.connect(url, (error, db) => {
    if (error) {
      cb(error);
      return;
    }
    const database = db.db(dbName);
    toCheckData(database, cb);
  });
};
