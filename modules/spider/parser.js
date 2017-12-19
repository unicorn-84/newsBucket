const cheerio = require('cheerio');

const folder = './parsers/';

exports.toParseMassMedia = (data, item, callback) => {
  const $ = cheerio.load(data, {
    normalizeWhitespace: true,
  });
  const parser = require(`${folder}${item.name}`);
  parser.toParse($, item.baseUrl, item.brand, item.color, (error, news) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, news);
  });
};
