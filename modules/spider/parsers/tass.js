const newsChecker = require('../newsChecker');
const log = require('../../../libs/log');

exports.toParse = ($, url, brand, color, cb) => {
  const news = [];
  try {
    const mainBlock = $('.main-slider-items');
    const mainNews = mainBlock.find('.main-slider__item').first();
    const mainList = mainBlock.find('.main-slider__subitem').first().find('.single-item');
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      brand,
      url,
      color,
      title: newsChecker.toCheckNews(mainNews.find('.title').text()),
      link: newsChecker.toCheckNews(mainNews.attr('href'), url),
      image: newsChecker.toCheckNews(mainNews.find('img').attr('src')),
    });
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand,
        url,
        color,
        title: newsChecker.toCheckNews($(this).find('a').last().text()),
        link: newsChecker.toCheckNews($(this).find('a').last().attr('href'), url),
        section: newsChecker.toCheckNews($(this).find('a').first().text()),
      });
    });
  } catch (error) {
    log.warn(`${brand} news parse error`);
    cb(error);
    return;
  }
  cb(null, news);
};
