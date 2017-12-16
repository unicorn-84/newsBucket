const newsChecker = require('../newsChecker');

exports.toParse = ($, url, brand, color, cb) => {
  const news = [];
  try {
    const mainBlock = $('.top-block');
    const mainList = mainBlock.find('.article').filter(i => i <= 4);
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand,
        url,
        color,
        title: newsChecker.toCheckNews($(this).find('img').first().attr('alt')),
        link: newsChecker.toCheckNews($(this).find('a').first().attr('href')),
        image: newsChecker.toCheckNews($(this).find('img').first().attr('src')),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};
