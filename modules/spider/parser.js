const cheerio = require('cheerio');
const log = require('../../libs/log');

const folder = './parsers/';

exports.toParseMassMedia = (data, item, callback) => {
  const $ = cheerio.load(data, {
    normalizeWhitespace: true,
  });
  const parser = require(`${folder}${item.name}`);
  parser.toParse($, item.baseUrl, item.brand, item.color, (error, news) => {
    if (error) {
      log.warn(`parser.toParse ${item}`);
      callback(error);
      return;
    }
    callback(null, news);
  });
};
