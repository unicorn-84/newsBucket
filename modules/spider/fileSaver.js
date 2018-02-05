const fs = require('fs');
const log = require('../../libs/log');

exports.toSaveData = (filename, data, callback) => {
  fs.writeFile(filename, data, (error) => {
    if (error) {
      log.warn('fileSaver fs.writeFile error');
      callback(error);
      return;
    }
    callback(null);
  });
};
