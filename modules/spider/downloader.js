const log = require('../../libs/log')(module);
const needle = require('needle');

function toRequest(url, cb) {
  needle.get(url, (error, res) => {
    log.warn(`${url}: ${res.statusCode}`);
    if (error) {
      log.error(error);
      cb(error);
      return;
    }
    if (res.statusCode === 302) {
      toRequest(res.headers.location, cb);
      return;
    }
    cb(null, res.body);
  });
}

exports.toDownload = (url, cb) => {
  toRequest(url, cb);
};
