const newsChecker = require('../newsChecker');
const log = require('../../../libs/log');

function toReplace(elem) {
  return elem.replace(/background-image:\s*url\(\s*['"]?(.*?)['"]?\s*\)[;]?/g, (match, str) => match.replace(match, str));
}

exports.toParse = ($, url, brand, color, cb) => {
  const news = [];
  try {
    const mainBlock = $('.listing__rows_main-promobox').first();
    const mainList = mainBlock.children('li').not('.listing__column_main-promobox_foreign-press');
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand,
        url,
        color,
        title: newsChecker.toCheckNews($(this).find('a').eq(2).text()),
        link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), url),
        image: toReplace(newsChecker.toCheckNews($(this).find('a').first().parent().attr('style'))),
        section: newsChecker.toCheckNews($(this).find('a').eq(1).text()),
      });
    });
  } catch (error) {
    log.warn(`${brand} news parse error`);
    cb(error);
  }
  cb(null, news);
};
