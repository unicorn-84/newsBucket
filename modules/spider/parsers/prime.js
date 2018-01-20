const newsChecker = require('../newsChecker');

exports.toParse = ($, item, cb) => {
  const news = [];
  try {
    const mainBlock = $('.main-news-carousel');
    const newsList = mainBlock.find('.main-news-carousel__item');
    newsList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        url: item[1],
        name: item[0],
        title: newsChecker.toCheckNews($(this).text()),
        link: newsChecker.toCheckNews($(this).find('a').attr('href'), item[1]),
        image: newsChecker.toCheckNews($(this).find('img').attr('src'), item[1]),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};
