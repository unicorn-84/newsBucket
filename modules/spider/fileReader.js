const fs = require('fs');
const log = require('../../libs/log');

exports.toGetData = (filename, callback) => {
  fs.readFile(filename, (error, data) => {
    if (error) {
      log.warn('fileSaver fs.readFile error');
      callback(error);
      return;
    }
    callback(null, data);
  });
};

