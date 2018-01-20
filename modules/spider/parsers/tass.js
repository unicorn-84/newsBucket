const newsChecker = require('../newsChecker');

exports.toParse = ($, item, cb) => {
  const news = [];
  try {
    const mainBlock = $('.main-slider-items');
    const mainNews = mainBlock.find('.main-slider__item').first();
    const mainList = mainBlock.find('.main-slider__subitem').first().find('.single-item');
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item[1],
      name: item[0],
      title: newsChecker.toCheckNews(mainNews.find('.title').text()),
      link: newsChecker.toCheckNews(mainNews.attr('href'), item[1]),
      image: newsChecker.toCheckNews(mainNews.find('img').attr('src')),
    });
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        url: item[1],
        name: item[0],
        title: newsChecker.toCheckNews($(this).find('a').last().text()),
        link: newsChecker.toCheckNews($(this).find('a').last().attr('href'), item[1]),
      });
    });
  } catch (error) {
    cb(error);
    return;
  }
  cb(null, news);
};
