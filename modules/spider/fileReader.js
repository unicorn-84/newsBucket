const fs = require('fs');

exports.toGetData = (filename, callback) => {
  fs.readFile(filename, (error, data) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, data);
  });
};

