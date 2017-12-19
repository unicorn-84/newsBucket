const fs = require('fs');

exports.toSaveData = (filename, data, callback) => {
  fs.writeFile(filename, data, (error) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null);
  });
};
