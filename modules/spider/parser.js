const cheerio = require('cheerio');
const path = require('path');

exports.toParseMassMedia = (data, item, cb) => {
  const $ = cheerio.load(data, {
    normalizeWhitespace: true,
  });
  const parser = require(`${path.join(__dirname, 'parsers')}/${item.name}`);
  parser.toParse($, item, (error, news) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null, news);
  });
};
