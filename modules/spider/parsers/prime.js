const newsChecker = require('../newsChecker');
const log = require('../../../libs/log');

exports.toParse = ($, url, brand, color, cb) => {
  const news = [];
  try {
    const mainBlock = $('.main-news-carousel');
    const newsList = mainBlock.find('.main-news-carousel__item');
    newsList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand,
        url,
        color,
        title: newsChecker.toCheckNews($(this).text()),
        link: newsChecker.toCheckNews($(this).find('a').attr('href'), url),
        image: newsChecker.toCheckNews($(this).find('img').attr('src'), url),
      });
    });
  } catch (error) {
    log.warn(`${brand} news parse error`);
    cb(error);
  }
  cb(null, news);
};
