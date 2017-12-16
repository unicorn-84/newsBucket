const log = require('../../libs/log')(module);
const needle = require('needle');

function toRequest(url, cb) {
  needle.get(url, (error, res) => {
    if (error) {
      cb(error);
      return;
    } else if (res.statusCode === 302 || res.statusCode === 301) {
      toRequest(res.headers.location, cb);
    }
    cb(null, res.body);
  });
}

exports.toDownload = (url, cb) => {
  toRequest(url, cb);
};
