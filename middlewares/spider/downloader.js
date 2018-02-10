const request = require('request');
const iconv = require('iconv-lite');
const charsetParser = require('charset-parser');

module.exports.toDownload = (url, cb) => {
  const options = {
    method: 'GET',
    url,
    encoding: null,
    gzip: true,
  };
  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      cb(error);
      return;
    }
    const charset = charsetParser(response.headers['content-type']);
    if (charset === 'windows-1251') {
      cb(null, iconv.decode(body, 'win1251'));
      return;
    }
    cb(null, body.toString());
  });
};
