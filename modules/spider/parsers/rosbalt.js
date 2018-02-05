const newsChecker = require('../newsChecker');
const log = require('../../../libs/log');

exports.toParse = ($, url, brand, color, cb) => {
  const news = [];
  try {
    const mainBlock = $('.headblock-main');
    const mainList = mainBlock.children('div').not('.main-content__topnews');
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand,
        url,
        color,
        title: newsChecker.toCheckNews($(this).find('span').first().text()),
        link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), url),
        image: newsChecker.toCheckNews($(this).find('img').first().attr('src')),
      });
    });
  } catch (error) {
    log.warn(`${brand} news parse error`);
    cb(error);
  }
  cb(null, news);
};
