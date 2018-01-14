const newsChecker = require('../newsChecker');

const prop = {
  brand: 'ПРАЙМ',
  color: '#003067',
};

exports.toParse = ($, item, cb) => {
  const news = [];
  try {
    const mainBlock = $('.main-news-carousel');
    const newsList = mainBlock.find('.main-news-carousel__item');
    newsList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand: prop.brand,
        url: item[1],
        color: prop.color,
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
