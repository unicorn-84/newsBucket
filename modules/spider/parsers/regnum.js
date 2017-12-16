const newsChecker = require('../newsChecker');

exports.toParse = ($, url, brand, color, cb) => {
  const news = [];
  try {
    const mainBlock = $('.news-container');
    const newsList = mainBlock.find('.news-container-item').filter(i => i <= 4);
    newsList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand,
        url,
        color,
        title: newsChecker.toCheckNews($(this).find('.news-container-item__article-header').text()),
        link: newsChecker.toCheckNews($(this).attr('href')),
        section: newsChecker.toCheckNews($(this).find('.news-container-item__article-theme').text()),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};
